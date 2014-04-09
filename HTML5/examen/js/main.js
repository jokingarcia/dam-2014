/*
Se quiere desarrollar un aplicación web que se trata de un juego basado en
un programa que estamos viendo en TV en ese momento y debe cumplir los
siguientes requisitos:
✔ Debemos consultar la información de un JSON que contendrá los datos del juego que va a comenzar
✔ Estos datos debemos almacenarlos en local para minimizar el número de consultas al servidor
✔ Cada juego constará de varios retos
✔ En cada reto tendremos que adivinar qué opción elegirá un jugador entre dos que se presentan
✔ Cada reto se desarrollará en un lugar y en cualquier momento podremos
consultar dónde se encuentra en un mapa y dónde estamos nosotros
*/
$(document).ready(function(){
    "use strict";
//✔ Disponer de una tabla para almacenar los shows. Los campos mínimos son:id, date, hour
var db = openDatabase('showdb', '1.0', 'TV shows', 2 * 1024 * 1024);
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS shows(id, date, hour)', [], null);
});

db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS players(id, name, age, description, photo, show)', [], null);
});

db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS challenges(id, selected, player)', [], null);
});
/*
db.transaction(function (tx) {
  tx.executeSql('DROP TABLE places', [], null);
});*/
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS places(address, latitude, longitude, description, photo, challenge, player)', [], null);
});



db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS options(id,name, photo, description, price, likes, challenge, player)', [], initializeShows);
});

var shows;
var playernumber = 0;
var challengenumber = 0;
//✔ Crear un método getTweets que dado un parámetro de fecha, me devuelva todos los tweets posteriores a esa fecha.
//Cada tweet debe incluir sus datos completos y el usuario que lo creó
function initializeShows() {

  console.log("getShows");
   removeAllShows();
   removeAllPlayers();
   removeAllChallenges();
   removeAllPlaces();
   removeAllOptions();
   var indexchallenge = 0;
   var indexoptions = 0;
  $('#shows').append("Shows: <br>");
  shows = $.ajax({
                url : './servidor/show.json',
                type : 'POST',
                cache : false,
                dataType : 'json',//te devuelve el objeto js
                success : function(data, textStatus, jqXHR) {
                    console.log('success initialize show ajax');
                    //shows
                     $.each(data, function(show) {//show tiene el índice, es decir, un número
                      db.transaction(function (tx) { //CADA SHOW EN UNA TRANSACCION → Procesa todas
                      var time = (new Date(Date.parse(data[show].date))).getTime();
                      tx.executeSql('INSERT INTO shows (id, date, hour) VALUES (?, ?, ?)',
                       [data[show].id, time / 1000, data[show].hour], successInsertShow(data[show]), errorInsertShow);
                       //players
                        $.each(data[show].players, function(player){
                           tx.executeSql('INSERT INTO players (id, name, age, description, photo, show) VALUES (?, ?, ?, ?, ?, ?)',
                           [player, data[show].players[player].player.name, data[show].players[player].player.age,
                           data[show].players[player].player.description, data[show].players[player].player.photo,
                           show], successInsertShow(data[show]), errorInsertShow);

                           //challenges
                          $.each(data[show].players[player].challenges, function(challenge){
                            tx.executeSql('INSERT INTO challenges (id, selected, player) VALUES (?, ?, ?)',
                            [indexchallenge, data[show].players[player].challenges[challenge].selected,
                            player], successInsertShow(data[show]), errorInsertShow);
                            indexchallenge++;
                            //place
                            tx.executeSql('INSERT INTO places(address, latitude, longitude, description, photo, challenge, player) VALUES (?,?, ?, ?,?,?,?)',
                            [data[show].players[player].challenges[challenge].place.address,
                             data[show].players[player].challenges[challenge].place.latitude,
                             data[show].players[player].challenges[challenge].place.longitude,
                             data[show].players[player].challenges[challenge].place.description,
                             data[show].players[player].challenges[challenge].place.photo,
                            challenge, player], successInsertShow(data[show]), errorInsertShow);
                            //options
                            tx.executeSql('INSERT INTO options(id,name, photo, description, price, likes, challenge, player) VALUES (?,?,?, ?, ?,?,?,?)',
                            [indexoptions,data[show].players[player].challenges[challenge].option1.name,
                             data[show].players[player].challenges[challenge].option1.photo,
                             data[show].players[player].challenges[challenge].option1.description,
                             data[show].players[player].challenges[challenge].option1.price,
                             data[show].players[player].challenges[challenge].option1.likes,
                            challenge, player], successInsertShow(data[show]), errorInsertShow);
                             indexoptions++;

                             tx.executeSql('INSERT INTO options(id,name, photo, description, price, likes, challenge, player) VALUES (?,?,?, ?, ?,?,?,?)',
                            [indexoptions,data[show].players[player].challenges[challenge].option2.name,
                             data[show].players[player].challenges[challenge].option2.photo,
                             data[show].players[player].challenges[challenge].option2.description,
                             data[show].players[player].challenges[challenge].option2.price,
                             data[show].players[player].challenges[challenge].option2.likes,
                            challenge, player], successInsertShow(data[show]), errorInsertShow);
                            indexoptions++;
                          });

                        });

                      });
                     });
                 },
                error : function(jqXHR, status, error) {
                    console.log(error);
                }
            });
}

function successInsertShow(show) {
  console.log("successInsertShow");
  //Una vez insertados los datos empieza a jugar el primer jugador

}
 playFirst();
function playFirst() {
  console.log("playFirst");
  //Se cargan los datos del primer challenge del primer jugador
  printPlayer(playernumber);
  printChallenge(challengenumber);
  printOptions(playernumber,challengenumber);
  printPlace(playernumber,challengenumber);
}
$(document).on('click','#seeResult',function(e){
    seeResult();//TODO
});
$(document).on('click','#nextChallenge',function(e){
    playNextChallenge();//TODO
});
$(document).on('click','#nextPlayer',function(e){
    printPlayer();//TODO
});
function playNextChallenge() {
  console.log("playNextChallenge");
  printPlayer(playernumber);
  printChallenge(challengenumber++);
  printOptions(playernumber,challengenumber++);
  printPlace(playernumber,challengenumber++);
}
function playNextPlayer() {
  console.log("playNextChallenge");
  challengenumber=0;
  printPlayer(playernumber++);
  printChallenge(challengenumber);
  printOptions(playernumber++,challengenumber);
  printPlace(playernumber++,challengenumber);
}
function printPlayer(id) {
  console.log("printPlayer");
  $('#player').empty();
  $('#player').append("Player: <br>");
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM players WHERE id=?',
      [id],
      function successPrintPlayer(tx, results){
         console.log("successPrintPlayer");
        var len = results.rows.length, i;
        console.log(len);
        for (i = 0; i < len; i++) {
          $('#player').append(results.rows.item(i).name + " - ");
          $('#player').append(results.rows.item(i).age + " - ");
          $('#player').append(results.rows.item(i).description + " - ");
          $('#player').append("<img src=\"" +results.rows.item(i).photo + "\" alt=\"player\">" +"<br>");
         }
      },
      error);
     });
}
function printChallenge(id) {
  console.log("printChallenge");
  $('#challenge').empty();
  $('#challenge').append("Challenge: <br>");
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM challenges WHERE id=?',
      [id],
      function successPrintChallenge(tx, results){
         console.log("successPrintChallenge");
        var len = results.rows.length, i;
        console.log(len);
        for (i = 0; i < len; i++) {

          $('#challenge').append(results.rows.item(i).id + "<br>");
         }
      },
      error);
     });
}
function printOptions(playerid,challengeid) {
  console.log("printOptions");
  $('#options').empty();
  $('#options').append("Options: <br>");
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM options WHERE challenge=? AND player=?',
      [challengeid, playerid],
      function successPrintOptions(tx, results){
         console.log("successPrintOptions");
        var len = results.rows.length, i;
        console.log(len);
        for (i = 0; i < len; i++) {
          $('#options').append(results.rows.item(i).name + " - ");
          $('#options').append("<img src=\"" +results.rows.item(i).photo + "\" alt=\"option\">" +" - ");
          $('#options').append(results.rows.item(i).description + " - ");
          $('#options').append(results.rows.item(i).price + " - ");
          $('#options').append(results.rows.item(i).likes + "<br>");

         }
      },
      error);
     });
}
function printPlace(playerid,challengeid) {
  console.log("printPlace");
  $('#place').empty();
  $('#place').append("Place: <br>");
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM places WHERE challenge=? AND player=?',
      [challengeid, playerid],
      function successPrintPlace(tx, results){
         console.log("successPrintPlace");
        var len = results.rows.length, i;
        console.log(len);
        for (i = 0; i < len; i++) {
          $('#place').append(results.rows.item(i).address + " - ");
          $('#place').append(results.rows.item(i).description + " - ");
           $('#place').append("<img src=\"" +results.rows.item(i).photo + "\" alt=\"option\">" +"<br>");
          //$('#place').append(results.rows.item(i).latitude + " - ");
          //$('#place').append(results.rows.item(i).longitude + "");
          showMap(results.rows.item(i).latitude,results.rows.item(i).longitude);
         }
      },
      error);
     });
}
/* navigator.geolocation.getCurrentPosition(function(position) {
     //Esta es la función de éxito del getCurrentPosition
            var coords = position.coords;
            console.log(coords.latitude + "" + coords.longitude + "" + coords.accuracy);
            var label = document.createElement('label');

            showMap(position);
            }, function(error) {
                console.log(error.code+""+error.message);
    });*/
function showMap(latitude, longitude) {
    console.log("showMap");
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '400px';
        mapcanvas.style.width = '560px';
        document.querySelector('article').appendChild(mapcanvas);
        var latlng = new google.maps.LatLng(latitude, longitude);
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "¡Usted está aquí!"
        });
    }
/*function showMap(position) {
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '400px';
        mapcanvas.style.width = '560px';
        document.querySelector('article').appendChild(mapcanvas);
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "¡Usted está aquí!"
        });
    }*/
function errorInsertShow() {
  console.log("errorInsertShow");
}
function error() {
  console.log("error");
}



function userExists() {
  console.log("userExists");
}
function addUser(userid) {
  console.log("addUser");
    db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
      tx.executeSql('INSERT INTO users (id_user, name, picture) VALUES (?, ?, ?)',
        [  userid, 'Manolo', 'foto'], successAddUser, errorAddUser);
    });
}
function successAddUser() {
  console.log("successAddUser");
}
function errorAddUser() {
  console.log("errorAddUser");
}


function removeAllShows() {
  console.log("removeAllShows");
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM shows');
    });
}
function removeAllPlayers() {
  console.log("removeAllPlayers");
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM players');
    });
}
function removeAllChallenges() {
  console.log("removeAllChallenges");
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM challenges');
    });
}
function removeAllPlaces() {
  console.log("removeAllPlaces");
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM places');
    });
}
function removeAllOptions() {
  console.log("removeAllOptions");
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM options');
    });
}


});
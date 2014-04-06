//Ejercicio 9 HTML 5. Web SQL
$(document).ready(function(){
    "use strict";   
var newuser = {
        id_user : "1",
        name : "Antonio",
        picture : "picture"
};
var users = [
{ "id_user":"1" , "name":"jokin1", "picture":"picture1"},
{ "id_user":"2" , "name":"jokin2", "picture":"picture2"},
{ "id_user":"3" , "name":"jokin3", "picture":"picture3"},
{ "id_user":"4" , "name":"jokin4", "picture":"picture4"},
{ "id_user":"5" , "name":"jokin5", "picture":"picture5"}
];
/*var tweets = [
{ "id":"1" , "user":"1", "date":"01-04-2014", "text":"texto1" },
{ "id":"2" , "user":"2", "date":"02-04-2014", "text":"texto2" },
{ "id":"3" , "user":"3", "date":"03-04-2014", "text":"texto3" },
{ "id":"4" , "user":"4", "date":"04-04-2014", "text":"texto4" },
{ "id":"5" , "user":"5", "date":"05-04-2014", "text":"texto5" }
];*/
var tweets;
 var newtweet ={"id":"6" , "user":"5", "date":"06-04-2014", "text":"texto6" };
  var newtweet2 ={"id":"7" , "user":"10", "date":"07-04-2014", "text":"texto7" };
//✔ Disponer de una tabla para almacenar los tweets. Los campos mínimos son: identificador del tweet, texto, usuario,
//y fecha de publicación
var db = openDatabase('tweetdb', '1.0', 'All my tweets', 2 * 1024 * 1024);
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS tweets(id, user, date, text)', [], initializeTweets);
});
//✔ Disponer de una tabla para almacenar los usuarios que publican los tweets. Esta tabla debe estar relacionada con
//la anterior. Los campos mínimos son: identificador del usuario, nombre e imagen
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS users(id_user, name, picture)', [], initializeUsers);
});
//✔ Crear un método getTweets que dado un parámetro de fecha, me devuelva todos los tweets posteriores a esa fecha.
//Cada tweet debe incluir sus datos completos y el usuario que lo creó
function initializeTweets() {
  console.log("getTweets");
   removeAllTweets();
  $('#tweets').append("Tweets: <br>");
  tweets = $.ajax({
                url : './servidor/tweets.json',
                type : 'POST',
                cache : false,
                dataType : 'json',//te devuelve el objeto js
                success : function(data, textStatus, jqXHR) {
                    console.log('success initialize tweets ajax');
                     $.each(data, function(tweet) {//tweet tiene el índice, es decir, un número
                      db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
                      var time = (new Date(Date.parse(data[tweet].date))).getTime();
                      tx.executeSql('INSERT INTO tweets (id, user, date, text) VALUES (?, ?, ?, ?)',
                       [data[tweet].id, data[tweet].user, time / 1000, data[tweet].text], successInsertTweet(data[tweet]), errorInsertTweet);
                      });
                     });
                 },
                error : function(jqXHR, status, error) {
                    console.log(error);
                }
            });
}
function printTweets() {
  console.log("printTweets");
  $('#tweets').empty();
  $('#tweets').append("Tweets: <br>");
    db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
      tx.executeSql('SELECT * FROM tweets',
      [], 
      function successPrintTweets(tx, results){
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
          $('#tweets').append(results.rows.item(i).id + " - ");
          $('#tweets').append(results.rows.item(i).user + " - ");
          $('#tweets').append(results.rows.item(i).date + " - ");
          $('#tweets').append(results.rows.item(i).text + "<br>");
         }
      }, 
      errorPrintTweets);
     });
}
function printTweetsFromDate(date) {
  console.log("printTweetsFromDate");
  $('#tweets').empty();
  $('#tweets').append("Tweets: <br>");
    db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
      tx.executeSql('SELECT * FROM tweets WHERE date>?',
      [date/1000], 
      function successPrintTweets(tx, results){
         console.log("successPrintTweets");
        var len = results.rows.length, i;
        console.log(len);
        for (i = 0; i < len; i++) {
          $('#tweets').append(results.rows.item(i).id + " - ");
          $('#tweets').append(results.rows.item(i).user + " - ");
          $('#tweets').append(results.rows.item(i).date + " - ");
          $('#tweets').append(results.rows.item(i).text + "<br>");
         }
      }, 
      errorPrintTweets);
     });
}
function successInsertTweet(tweet) {
  console.log("successInsertTweet");
  $('#tweets').append(tweet.id + " - ");
  $('#tweets').append(tweet.user + " - ");
  $('#tweets').append(tweet.date + " - ");
  $('#tweets').append(tweet.text + "<br>");
}
function errorInsertTweet() {
  console.log("errorInsertTweet");
}
function errorPrintTweets() {
  console.log("errorPrintTweets");
}
function initializeUsers() {
  console.log("getUsers");
   removeAllUsers();
   $('#users').append("Users: <br>");
  users = $.ajax({
                url : './servidor/users.json',
                type : 'POST',
                cache : false,
                dataType : 'json',//te devuelve el objeto js
                success : function(data, textStatus, jqXHR) {
                    console.log('success initialize users ajax');
                     $.each(data, function(user) {//user tiene el índice, es decir, un número
                      db.transaction(function (tx) { 
                      tx.executeSql('INSERT INTO users (id_user, name, picture) VALUES (?, ?, ?)',
                     [data[user].id_user, data[user].name, data[user].picture], successInsertUser(data[user]), errorInsertUser);
                      });
                     });
                 },
                error : function(jqXHR, status, error) {
                    console.log(error);
                }
            });
}
function successInsertUser(user) {
   console.log("successInsertUser");
  $('#users').append(user.id_user + " - ");
  $('#users').append(user.name + " - ");
  $('#users').append(user.picture + "<br>");
}
function errorInsertUser() {
  console.log("errorGetUsers");
}
$(document).on('click','#getTweets',function(e){
    printTweetsFromDate($('#date')[0].valueAsNumber);
  });
 $(document).on('click','#addTweet',function(e){
    addTweet(newtweet);
    addTweet(newtweet2);
    printTweets();
  });
 $(document).on('click','#removeTweet',function(e){
    removeTweet('6');
    printTweets();
  });
 $(document).on('click','#updateTweet',function(e){
    updateTweet(newtweet2);
    printTweets();
  });

//✔ Crear un método addTweet que dado un objeto que corresponde con un tweet, lo almacene en la base de datos.
function addTweet(tweet) {
  console.log("addTweet");
    var tweetid=tweet.id;
    var tweetuser=tweet.user;
    var tweetdate=tweet.date;
    var tweettext=tweet.text;
    db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
      var time = (new Date(Date.parse(tweetdate))).getTime();
      tx.executeSql('INSERT INTO tweets (id, user, date, text) VALUES (?, ?, ?, ?)',
        [  tweetid, tweetuser, time / 1000, tweettext]);
     // [  '6', '6', time / 1000, 'text6']);
      //TODO: Almacenar el usuario en caso de que no exista, o relacionarlo con el tweet si existe
        tx.executeSql('SELECT * FROM users WHERE id_user=?',
        [  tweetuser], userExists, addUser(tweetuser));

   //  tx.executeSql('INSERT INTO users (id_user, name, picture) VALUES (?, ?, ?)',
   //[  tweet.user.id, tweet.user.name, tweet.user.picture]);
    });

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

//✔ Crear un método removeTweet que dado un identificador de tweet, lo elimine de la base de datos. Éste método debe
 //devolver el tweet eliminado
 //DELETE FROM table_name WHERE some_column=some_value;
function removeTweet(idtweet) {
  console.log("removeTweet");
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM tweets WHERE id=?',
   [idtweet]);

    });
}
function removeAllTweets() {
  console.log("removeAllTweets");
    db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
      tx.executeSql('DELETE FROM tweets');

    });
}
function removeAllUsers() {
  console.log("removeAllUsers");
    db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
      tx.executeSql('DELETE FROM users');

    });
}
//✔ Crear un método updateTweet que dado un objeto que corresponde con un tweet, actualice los datos correspondientes
// al tweet en la base de datos
//UPDATE table_name SET column1=value1,column2=value2,... WHERE some_column=some_value;
function updateTweet(tweet) {
  console.log("updateTweet");
   var tweetid=tweet.id;
    var tweetuser=tweet.user;
    var tweetdate=tweet.date;
    var tweettext=tweet.text;
    db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
      var time = (new Date(Date.parse(tweet.created_at))).getTime();
      tx.executeSql('UPDATE tweets SET text=? WHERE id=?',
   [  'nuevotexto', tweetid]);

    });
}

});
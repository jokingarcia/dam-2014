//Ejercicio 8 HTML 5. Storage
$(document).ready(function(){
    "use strict";
//✔ Disponer de una tabla para almacenar los tweets. Los campos mínimos son: identificador del tweet, texto, usuario,
//y fecha de publicación
var db = openDatabase('tweetdb', '1.0', 'All my tweets', 2 * 1024 * 1024);
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS tweets(id, user, date, text)', [], getTweets);
});
//✔ Disponer de una tabla para almacenar los usuarios que publican los tweets. Esta tabla debe estar relacionada con
//la anterior. Los campos mínimos son: identificador del usuario, nombre e imagen
db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS users(id_user, name, picture)', []);
});
var user1 = {
        id_user : "1",
        name : "Antonio",
        picture : "picture"
};
var tweets = [
{ "id":"1" , "user":"1", "date":"1396625063511", "text":"texto1" },
{ "id":"2" , "user":"2", "date":"1396625063512", "text":"texto2"  },
{ "id":"3" , "user":"3", "date":"1396625063513", "text":"texto3"  },
{ "id":"4" , "user":"4", "date":"1396625063514", "text":"texto4"  },
{ "id":"5" , "user":"5", "date":"1396625063515", "text":"texto5"  }
];


//✔ Crear un método getTweets que dado un parámetro de fecha, me devuelva todos los tweets posteriores a esa fecha.
//Cada tweet debe incluir sus datos completos y el usuario que lo creó
function getTweets() {
  console.log("getTweets");
  removeAllTweets();
  // var tweets = $.ajax({
  //               url : '../servidor/cargaTweetsJSON.php',
  //               type : 'POST',
  //               cache : false,
  //               dataType : 'json',//te devuelve el objeto js
  //               success : function(data, textStatus, jqXHR) {
  //                   console.log('success');
  //                },
  //               error : function(jqXHR, status, error) {
  //                   console.log(error);
  //               }
  //           });
  var index=0;
  $.each(tweets, function(tweet) {
    console.log("index: "+index);
    console.log("tweets: "+tweets[index].id);
    db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
      var time = (new Date(Date.parse('1396625063515'))).getTime();
      tx.executeSql('INSERT INTO tweets (id, user, date, text) VALUES (?, ?, ?, ?)',
        //[  tweet.id, tweet.user, time / 1000, tweet.text]);
        [  tweets[index].id, 'Manolo', time / 1000, 'texto']);
     });
    index++;
  });
  var newtweet ={"id":"6" , "user":"6", "date":"1396625063516", "text":"texto6" };
  addTweet(newtweet);
  removeTweet('6');
  updateTweet(newtweet);
}
//✔ Crear un método addTweet que dado un objeto que corresponde con un tweet, lo almacene en la base de datos.
function addTweet(tweet) {
  console.log("addTweet");
    db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
      var time = (new Date(Date.parse('1396625063515'))).getTime();
      tx.executeSql('INSERT INTO tweets (id, user, date, text) VALUES (?, ?, ?, ?)',
   //[  tweet.id, tweet.from_user, time / 1000, tweet.text]);
      [  '6', '6', time / 1000, 'text6']);
      //TODO: Almacenar el usuario en caso de que no exista, o relacionarlo con el tweet si existe
   //  tx.executeSql('INSERT INTO users (id_user, name, picture) VALUES (?, ?, ?)',
   //[  tweet.user.id, tweet.user.name, tweet.user.picture]);
    });

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
//✔ Crear un método updateTweet que dado un objeto que corresponde con un tweet, actualice los datos correspondientes
// al tweet en la base de datos
//UPDATE table_name SET column1=value1,column2=value2,... WHERE some_column=some_value;
function updateTweet(tweet) {
  console.log("updateTweet");
    db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
      var time = (new Date(Date.parse(tweet.created_at))).getTime();
      tx.executeSql('UPDATE tweets SET user=? WHERE id=?',
   [  'Antonio', '1']);

    });
}

});
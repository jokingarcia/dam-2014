//Ejercicio 10 HTML 5. IndexedDB
/*✔ Disponer de un almacén de tareas pendientes. Sus propiedades son: un identificador único
 que actúa como índice, el texto descriptivo, una propiedad que nos indique si la tarea
  está completada o no y la fecha/hora de creación
*/
$(document).ready(function(){
    "use strict";
   window.indexedDB = window.indexedDB || window.mozIndexedDB ||
 window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction ||
 window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
 window.webkitIDBKeyRange || window.msIDBKeyRange;

 var task = {
    id:"1",
    description: "descripción",
    done: false,
    date: (new Date).getTime()
 };
  var request = indexedDB.open('tasks');
  request.onerror = function () {
    console.log('failed to open indexedDB');
  };
  var db = null, version = '0.1';
  request.onsuccess = function (event) {
    // cache a copy of the database handle for the future
    db = event.target.result;

  };
  request.onupgradeneeded = function(event) {
      var db = event.target.result;
      // Create object store
  };

//✔ Crear un método addTask que dado un objeto que corresponde con una tarea, lo
//almacene en la base de datos
function addTask() {
  console.log("addTask");
  var transaction = db.transaction(['tasks'], 'readwrite');
  var store = transaction.objectStore('tasks');
  var request = store.put(task);
}
//✔ Crear un método getTasks que dado un parámetro booleano completado,
//nos devuelva las tareas que se encuentran completadas o no
function getTasks(done) {
  console.log("getTasks");
  var transaction =
    db.transaction(['tasks'], myIDBTransaction.READ);
  var store = transaction.objectStore('tasks');
  var data = [];
  var request = store.openCursor();
  request.onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
        // value is the stored object
        data.push(cursor.value);
        // get the next object
        cursor.continue();
    } else {
       //Objects are in data[]
    }
  };
}
//✔ Crear un método removeTask que dado un identificador de una tarea, lo elimine de
//la base de datos. Éste método debe devolver la eliminada.
function removeTask(id) {
  console.log("removeTask");
  var myIDBTransaction =
    window.IDBTransaction || window.webkitIDBTransaction || { READ_WRITE: 'readwrite' };
  var transaction =
    db.transaction(['tasks'], myIDBTransaction.READ_WRITE);
  var store = transaction.objectStore('tasks');
  var request = store.delete(id);
}
//✔ Crear un método updateTask que dado un identificador de una tarea, actualice los
//datos correspondientes a la tarea en la base de datos
function updateTask(id) {
  console.log("updateTask");

}

});
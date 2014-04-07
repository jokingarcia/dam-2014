//Ejercicio 10 HTML 5. IndexedDB
/*✔ Disponer de un almacén de tareas pendientes. Sus propiedades son: un identificador único
 que actúa como índice, el texto descriptivo, una propiedad que nos indique si la tarea
  está completada o no y la fecha/hora de creación
*/
$(document).ready(function(){
    "use strict";   
   window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
 
  if ('webkitIndexedDB' in window) {
    window.IDBTransaction = window.webkitIDBTransaction;
    window.IDBKeyRange = window.webkitIDBKeyRange;
  }
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
    // handle version control
    if (version != db.version) {
        // set the version to 0.1
        var verRequest = db.setVersion(version);
        verRequest.onsuccess = function (event) {
           // then create a new object store
          var store = db.createObjectStore('tasks', {
             keyPath: 'id',
             autoIncrement: false
           });
          addTask();
        };
        verRequest.onerror = function () {
            alert('unable to set the version :' + version);
        };
    }
   
  };
//✔ Crear un método addTask que dado un objeto que corresponde con una tarea, lo 
//almacene en la base de datos
function addTask() {
  console.log("addTask");
   var transaction =
    db.transaction(['tasks'], myIDBTransaction.READ_WRITE);
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
        // we’ve got all the data now, call
        // a success callback and pass the
        // data object in.
    }
  };
}
//✔ Crear un método removeTask que dado un identificador de una tarea, lo elimine de 
//la base de datos. Éste método debe devolver la eliminada.
function removeTask(id) {
  console.log("removeTask");
  var myIDBTransaction =
    window.IDBTransaction
    || window.webkitIDBTransaction
    || { READ_WRITE: 'readwrite' };
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
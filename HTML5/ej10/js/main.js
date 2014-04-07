window.indexedDB = window.indexedDB || window.mozIndexedDB ||
                window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction ||
                window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
                window.webkitIDBKeyRange || window.msIDBKeyRange;

var db = null;

function onerror(e) {
    console.log(e);
}

function open () {
    var version = 4;
    var request = indexedDB.open("todo-list", version);

    request.onupgradeneeded = function(e) {
        db = e.target.result;

        var store = db.createObjectStore("todo-list",
                    { keyPath: "timeStamp" });
    };

    request.onerror = onerror;

    request.onsuccess = function(e) {
         db = e.target.result;
        console.log("DB opened");
        getAllTodoItems();
    };
}

function add (todoText) {
    var transaction = db.transaction(["todo-list"], "readwrite");
    var store = transaction.objectStore("todo-list");

    var data = {
        "text": todoText,
        "timeStamp": new Date().getTime()
    };

    var request = store.put(data);

    request.onsuccess = function(e) {
        console.log("Sucessful add: "+e);
    };

    request.onerror = function(e) {
        console.log("Error adding: ", e);
    };
    store.transaction.oncomplete = function(event){
        getAllTodoItems();
    };
}

function getAllTodoItems() {
    console.log("getAllTodoItems");
    var todos = document.getElementById("todoItems");
    todos.innerHTML = "";
    var transaction = db.transaction(["todo-list"]);
    var store = transaction.objectStore("todo-list");

    var cursorRequest = store.openCursor();
    var data = [];
    cursorRequest.onsuccess = function(e) {
       var cursor = event.target.result;
         if (cursor) {
             // value is the stored object
            data.push(cursor.value);
            // get the next object
            cursor.continue();
         } else {
             //Objects are in data[]
             console.log("objects are in data[]");
             for (var i = data.length - 1; i >= 0; i--) {
                  $('#todoItems').append("<li>"+data[i].text +"</li>");
             }

        }
    };
    cursorRequest.onerror = onerror;
}
//✔ Crear un método removeTask que dado un identificador de una tarea, lo elimine de
//la base de datos. Éste método debe devolver la eliminada.
function removeTask(id) {
  console.log("removeTask");
   var transaction = db.transaction(["todo-list"], "readwrite");
    var store = transaction.objectStore("todo-list");
  var request = store.delete(parseInt(id));
}

function addTodo() {
    var todo = document.getElementById("todo");
    add(todo.value);
    todo.value = "";
}
function removeTodo() {
    var key = document.getElementById("key");
    removeTask(key.value);
    key.value = "";
}
function updateTodo() {
    var key = document.getElementById("keyupdate");
    updateTask(key.value);
    key.value = "";
}
//✔ Crear un método updateTask que dado un identificador de una tarea, actualice los
//datos correspondientes a la tarea en la base de datos
function updateTask(id) {
  console.log("updateTask");
  var transaction = db.transaction(["todo-list"], "readwrite");
    var store = transaction.objectStore("todo-list");
    var data = {
        "text": "nuevoTexto",
        "timeStamp": parseInt(id)
    };
    var request = store.put(data);
    request.onsuccess = function(e) {
        console.log("Sucessful update: "+e);
    };
    request.onerror = function(e) {
        console.log("Error updating: ", e);
    };
}

function init() {
    open();
}

window.addEventListener("DOMContentLoaded", init, false);

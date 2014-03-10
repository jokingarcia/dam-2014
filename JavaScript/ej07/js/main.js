//Ejercicio 16: addChild a los ul
//Este es el esquema típico para que pueda ejecutarse muestra cuando clican estando en una
//crear un alias para escribir $ en vez de document.querySelectorAll
//Se puede llamar desde cualquier lugar porque la añado a window que es lo más general
window.$ = function(selector){
    var elems = document.querySelectorAll(selector);
    return (elems.length===1) ? elems[0] : elems;
};
var anade = (function(){
    "use strict";
    //todo debería estar aquí dentro para que nada se ejecuta hasta que el navegador esté cargado
    window.onload = function(){

    }
    //cojo la lista fuera de la función para recorrerla solo una vez
     var lista = $('#lista'),
         lis = lista.children;

    //e es la vble que nos va a pasar js con un evento
    var mostrarTexto=function(e){
        //esto hará que se pare lo que haga por defecto. Por ejm., si es un enlace, dejará de ir donde tenga que ir
        e.preventDefault();

        //Hará referencia al elemento que ha lanzado el evento
        console.log(e);

    };
    lista.addEventListener('click', mostrarTexto);
    // for (var i = lis.length - 1; i >= 0; i--) {
    //     lis[i].addEventListener('click', mostrarTexto);//cuidado! Sin paréntesis, solo la ref., que no la ejecute
    // }

    var anade = function(){
       // Crear nodo de tipo li
         var list_item = document.createElement("li");
        // Crear nodo de tipo Text
        var contenido = document.createTextNode("Nuevo elemento");
        // Añadir el nodo Text como hijo del nodo Element
        list_item.appendChild(contenido);
        // Añadir el nodo Element como hijo de la lista
        lista.appendChild(list_item);
    };
    return anade;
})();



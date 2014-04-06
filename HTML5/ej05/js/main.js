//Ejercicio 5 HTML 5. Dataset
$(document).ready(function(){
    "use strict";
    //Versión js
   //Obtener cada uno de los atributos data- de los elementos de la lista, y mostrarlos por consola.
   var lista = $('.user');
   //Alternativa: Para evitar ir por cada atributo, podríamos recorrer el dataset
   // var data = lista[i].dataset;
   // for (var i = Things.length - 1; i >= 0; i--) {
   //   Things[i]
   // };
   for (var i = lista.length - 1; i >= 0; i--) {
      console.log("name: "+lista[i].dataset.name + " city: "+lista[i].dataset.city + " lang: "+lista[i].dataset.lang + " food: "+lista[i].dataset.food);
      // Modificar el idioma es por es_ES.
      if(lista[i].dataset.lang=="es"){
        lista[i].dataset.lang = "es_ES";
      }
      // Eliminar los elementos de la lista cuyo atributo data-delete sea true
      if(lista[i].dataset.delete === true){
        lista[i].parentNode.removeChild(lista[i]);
      }
   }
    for (var j = lista.length - 1; j >= 0; j--) {
      console.log("name: "+lista[j].dataset.name + " city: "+lista[j].dataset.city + " lang: "+lista[j].dataset.lang + " food: "+lista[j].dataset.food);
   }

   //Versión jQuery
    var listajquery = $('.user');

   for (var x = listajquery.length - 1; x >= 0; x--) {
      console.log("name: "+$(listajquery[x]).data('name') + " city: "+$(listajquery[x]).data('city') + " lang: "+$(listajquery[x]).data('lang') + " food: "+$(listajquery[x]).data('food'));
      // Modificar el idioma es por es_ES.
      if($(listajquery[x]).data('lang')=="es"){
        //listajquery[x].data('lang') = "es_ES";
      }
      // Eliminar los elementos de la lista cuyo atributo data-delete sea true
      if($(listajquery[x]).data('delete') === true){
        $(listajquery[x]).remove();
      }
   }
    for (var z = listajquery.length - 1; z >= 0; z--) {
      console.log("name: "+$(listajquery[z]).data('name') + " city: "+$(listajquery[z]).data('city') + " lang: "+$(listajquery[z]).data('lang') + " food: "+$(listajquery[z]).data('food'));
   }


});
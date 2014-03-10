//
(function(){
    "use strict";
    //Número de enlaces de la página
    var enlaces = document.getElementsByTagName('a');
    console.log(enlaces.length);
    var enlaces = document.querySelectorAll('a');
    console.log(enlaces.length);

    //Dirección a la que enlaza el penúltimo enlace
    var enlace = enlaces[enlaces.length-2];
    console.log(enlace.href);

    enlaces = document.querySelectorAll('p:last-of-type');
    if(enlaces.length > 0){
         console.log(enlaces[0].length);
    }
    //Obtener los enlaces
    var count=0;
    for (var i= enlaces.length - 1; i >= 0; i--) {
        if(enlaces[i].href=="http://prueba")
            count++;
    }
    console.log(count);
    enlaces = document.querySelectorAll('a[href="http://prueba"]');
    console.log(enlaces);
    //Número de enlaces del tercer párrafo
    var parrafos = document.querySelectorAll('body > p');
    if(parrafos.length > 3){
        enlaces = parrafos[2].querySelectorAll('a');
        console.log(enlaces.length);
    }
    //otra forma más directa
    enlaces = document.querySelectorAll('body > p:last-child-of-type a');
})();
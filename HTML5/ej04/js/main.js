//Ejercicio 3 HTML 5. Formulario
$(document).ready(function(){
    "use strict";
    // Cuáles de los 12 nuevos tipos de input soporta el navegador
    //search, tel, url, email, datetime, date, month, week, time, datetime-local, number, range, color
    if (Modernizr.inputtypes.email) {
        console.log("email");
    } else {
      console.log("email no");
    }
    if (Modernizr.inputtypes.search) {
        console.log("search");
    } else {
      console.log("search no");
    }
    if (Modernizr.inputtypes.tel) {
        console.log("tel");
    } else {
      console.log("tel no");
    }
    if (Modernizr.inputtypes.url) {
        console.log("url");
    } else {
      console.log("url no");
    }
    if (Modernizr.inputtypes.datetime) {
        console.log("datetime");
    } else {
      console.log("datetime no");
    }
    if (Modernizr.inputtypes.date) {
        console.log("date");
    } else {
      console.log("date no");
    }
    if (Modernizr.inputtypes.month) {
        console.log("month");
    } else {
      console.log("month no");
    }
    if (Modernizr.inputtypes.week) {
        console.log("week");
    } else {
      console.log("week no");
    }
    if (Modernizr.inputtypes.time) {
        console.log("time");
    } else {
      console.log("time no");
    }
    if (Modernizr.inputtypes.number) {
        console.log("number");
    } else {
      console.log("number no");
    }
    if (Modernizr.inputtypes.range) {
        console.log("range");
    } else {
      console.log("range no");
    }
    if (Modernizr.inputtypes.color) {
        console.log("color");
    } else {
      console.log("color no");
    }
     // Qué codecs de reproducción de vídeo soporta cada navegador
     if (Modernizr.video) {
        console.log("video ok");
        // let's play some video! but what kind?
         if (Modernizr.video.webm) {
            console.log("video: webm");
         }else{
             console.log("no video: webm");
         }
         if (Modernizr.video.ogg) {
            console.log(Modernizr.video.ogg);
         }else{
             console.log("no video: ogg");
         }
         if (Modernizr.video.h264) {
            console.log("video: h264");
         }else{
             console.log("no video: h264");
         }
    }
    // Qué sistema(s) de almacenamiento local soporta cada navegador
    if (Modernizr.localstorage) {
        console.log("localstorage");
    } else {
        console.log("no localstorage");
    }
    //Identificar si el navegador soporta el atributo placeholder. En caso de no soportar dicha funcionalidad,
    //cargar el polyfill correspondiente para añadir dicha funcionalidad al navegador
    Modernizr.load({
        test: Modernizr.inputtypes.date,
        yep : 'js/polyfill.js',
        nope: 'js/polyfill.js'
    });

});
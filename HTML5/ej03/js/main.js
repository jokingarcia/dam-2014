//Ejercicio 3 HTML 5. Formulario
$(document).ready(function(){
    "use strict";
    var allInputs = $( ":input" );
    var pBar = $("#progress");
    $(document).on('blur',':input',function(e){
        console.log("blur");
        //Hay una opción para ver si el navegador valida
        //inputs[i].validity.valid
        pBar[0].setAttribute("value", "0.5");

    });


});
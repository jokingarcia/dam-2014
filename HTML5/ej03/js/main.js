//Ejercicio 3 HTML 5. Formulario
$(document).ready(function(){
    "use strict";
     $('#progress').val(0);
    $(document).on('blur',':input',function(e){
        console.log("blur");
        var validos = [];
        var numvalidos = 0;
        var inputs = $( ":input" );
        for (var i = inputs.length - 1; i >= 0; i--) {
            if (inputs[i].validity.valid && $(inputs[i]).val().length > 0) {
                validos[i] = 1;
            } else {
                validos[i] = 0;
            }
        };
        for (var i = validos.length - 1; i >= 0; i--) {
            if (validos[i] == 1) {
                numvalidos++;
            }
        };
        $('#progress').val(numvalidos);
    });
});
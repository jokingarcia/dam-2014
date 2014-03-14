$(function(){
    'use strict';
    //Establecer el valor del elemento input igual al valor del elemento label;
    var $input = $('input[name=q]');
    var $label = $('label[for=q]');
    var $hint = $label.text();
    //TODO:usar estar
    var labelvalue = $('label[for=q]').text();
    console.log("labelvalue: "+labelvalue);
    $('input[name=q]').val("Enter input text");
    //Añadir la clase "hint" al elemento input;
    $('input[name=q]').addClass('hint');
    //Remover el elemento label;
    //NO hay que volver a recorrer el arbol. Habría que haber guardado el input
    $('label[for=q]').remove();
    //Vincular un evento focus en el input para remover el texto de sugerencia y la clase "hint";
    $('input[name=q]').on('focus', function() {
        console.log('focus');
        if($input.val() === $hint){
            $input.val('');
        }
         $('input[name=q]').val(""); //también this.value
         $('input[name=q]').removeClass('hint');
    });
    //Vincular un evento blur en el input para restaurar el texto de sugerencia y la clase "hint" en caso que no se haya ingresado algún texto.
     $('input[name=q]').on('blur', function() {
        console.log('blur');
        if($input.val().length === 0){
            $input.val($hint);
        }
         $('input[name=q]').val("Enter search term");
         $('input[name=q]').addClass('hint');
    });


})();

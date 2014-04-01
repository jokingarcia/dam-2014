//Ejercicio 2 HTML 5. Editor de textos
$(document).ready(function(){
    "use strict";

    var contenido = localStorage.getItem('contenido')||"El contenido de este bloque es editable";

    $('#editable').designMode = 'on';
    $('#editable').html(contenido);


    $(document).on('click','#negrita',function(e){
        document.execCommand('bold',false,null);

    });
    $(document).on('click','#cursiva',function(e){
        document.execCommand('italic',false,null);

    });
    $(document).on('click','#sub',function(e){
        document.execCommand('underline',false,null);

    });

    $(document).on('click','#guardar',function(e){
        localStorage.setItem('contenido', $('#editable').html());
    });
});
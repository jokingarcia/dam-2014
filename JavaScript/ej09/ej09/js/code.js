//validar formulario
//Escuchar eventos de la página: blur
//submit en el formulario: prevent_default para que no se envía si algo va mal
//añadir listeners
window.$ = function(selector){
    var elems = document.querySelectorAll(selector);
    return (elems.length===1) ? elems[0] : elems;
};
var validarFormulario = (function(){
    "use strict";
    console.log("resultado: "+validador.required(""));
    console.log("resultado: "+validador.required("asd"));
    console.log("resultado: "+validador.email(""));
    console.log("resultado: "+validador.email("jokingarcia@hotmail.com"));
    console.log("resultado: "+validador.password("s"));
    console.log("resultado: "+validador.password("jokiN8garcia"));
    console.log("resultado: "+validador.max("ssodiiiiiiiiiidddiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",50));
    console.log("resultado: "+validador.max("jokiN8garcia",50));

    var validateField = function(fieldType, validator, params){
        var fieldValue = fieldType.value;
        var validatorParams = "";
        if(fieldType.type == "checkbox"){
            fieldValue = fieldType.checked;
        }
        if (params!==undefined && params){
            validatorParams=", '"+params + "'";
        }
        console.log("validador."+ validator + "('" + fieldValue+ "'" + validatorParams +")");
        //Llamar a la función dependiendo del tipo
        return eval("validador."+ validator + "('" + fieldValue+ "'" + validatorParams +")");
    };

    var text2Validate = function(validator){
        var elements = $('[data-validator = "' + validator + '"]');

        if(elements.length==undefined){
             console.log(validateField(elements, validator, elements.dataset.longitud));
        }else{
             for (var i = elements.length - 1; i >= 0; i--) {
                console.log(validateField(elements[i], validator, elements[i].dataset.longitud));
            }



        }
    };

    var formOnSubmit = function(e){
        e.preventDefault();
        e.stopPropagation();
        console.log("formOnSubmit");
        text2Validate("required");
        text2Validate("email");
        text2Validate("password");
        text2Validate("max");
        text2Validate("checked");
    };

    /*var requerido = $('[data-validator="required"]');
    console.log(requerido);
    var email = $('[data-validator="email"]');
    console.log(email);
    var password = $('[data-validator="password"]');
    console.log(password);
    var max = $('[data-validator="max"]');
    console.log(requerido);
    var checked = $('[data-validator="checked"]');
    console.log("checked"+checked);*/


    $('form').addEventListener('submit', formOnSubmit);
    var nombre =  $('#registro_nombre');
    console.log(nombre.name);
    //nombre.addEventListener('onblur', validador.required(nombre));

    var validarFormulario = function(){

    };
    return validarFormulario;
})();



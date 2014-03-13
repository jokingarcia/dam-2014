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
  /*  console.log("resultado: "+validador.required(""));
    console.log("resultado: "+validador.required("asd"));
    console.log("resultado: "+validador.email(""));
    console.log("resultado: "+validador.email("jokingarcia@hotmail.com"));
    console.log("resultado: "+validador.password("s"));
    console.log("resultado: "+validador.password("jokiN8garcia"));
    console.log("resultado: "+validador.max("ssodiiiiiiiiiidddiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",50));
    console.log("resultado: "+validador.max("jokiN8garcia",50));
*/
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
        //validador.required(campo)
        return validador[validator](fieldValue,validatorParams);
        //return eval("validador."+ validator + "('" + fieldValue+ "'" + validatorParams +")");
    };
    var changeStyle = function(validated, element){
        if(validated){
            element.className = "white";
        }else{
            element.className="red";
        }
    };

    var text2Validate = function(validator, f){
        var elements = $('[data-validator = "' + validator + '"]');
        if(elements.length===undefined){
             f(validateField(elements, validator, elements.dataset.longitud), elements);
        }else{
             for (var i = elements.length - 1; i >= 0; i--) {
                f(validateField(elements[i], validator, elements[i].dataset.longitud), elements[i]);
            }

        }
    };

    var formOnSubmit = function(e){
        //TODO Si hay errores pararlo
        e.preventDefault();
        e.stopPropagation();
        console.log("formOnSubmit");
        //function(validator, f)
        text2Validate("required", changeStyle);
        text2Validate("email", changeStyle);
        text2Validate("password", changeStyle);
        text2Validate("max", changeStyle);
        text2Validate("checked", changeStyle);
    };
    var anadirListeners = function(validator, evento, validador){
        var elements=$('[data-validator="' + validator + '"]');
        var numElements = elements.length;
        if (numElements === undefined) {
            elements.addEventListener(evento, validador);
        }else{
            for (var i = numElements - 1; i >= 0; i--) {
                elements[i].addEventListener(evento, validador);
            }
        }
    };


    var executeFunctionValidatorByElement = function(element, validator, f){
        f(validateField(element, validator, element.dataset.longitud), element);
    };
     var validarRequired = function(validator, f){
        executeFunctionValidatorByElement(this, 'required', changeStyle);
    };

     var validarEmail = function(){
         executeFunctionValidatorByElement(this, 'email', changeStyle);
    };
     var validarPassword = function(){
        executeFunctionValidatorByElement(this, 'password', changeStyle);
    };
     var validarMax = function(){
        executeFunctionValidatorByElement(this, 'max', changeStyle);
    };
     var validarChecked = function(){
         executeFunctionValidatorByElement(this, 'checked', changeStyle);
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


   /* var nombre =  $('#registro_nombre');
    nombre.addEventListener('blur', validarRequired);
    var apellido =  $('#registro_apellido');
    apellido.addEventListener('blur', validarRequired);
    var email =  $('#registro_email');
    email.addEventListener('blur', validarEmail);
    var password =  $('#registro_password');
    password.addEventListener('blur', validarPassword);
    var comentarios =  $('#registro_comentarios');
    comentarios.addEventListener('blur', validarMax);
    var condiciones =  $('#registro_condiciones');
    condiciones.addEventListener('blur', validarChecked);*/
    anadirListeners('required', 'blur', validarRequired);
    anadirListeners('email', 'blur', validarEmail);
    anadirListeners('max', 'blur', validarMax);
    anadirListeners('password', 'blur', validarPassword);
    anadirListeners('checked', 'blur', validarChecked);


    return validarFormulario;
})();



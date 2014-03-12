//Ejercicio 13: expresiones regulares
//El validador será un objeto con las llaves. Abstracto estático: no hay que crear uno cada vez
//Leer el value y tipo para saber lo que hay que aplicar
window.$ = function(selector){
    var elems = document.querySelectorAll(selector);
    return (elems.length===1) ? elems[0] : elems;
};
var validador = (function(){
    "use strict";
    var validador ={};
    //que tenga algún valor. T or
    validador.required= function(campo) {

         return campo!==undefined && campo.trim()!=="";};
    //email válido
    validador.email= function(campo){
        var email=/^(\w+)((\.|-|_)(\w+))*@(\w+)(\.\w{2,})+$/;
        return campo!==undefined && email.test(campo);
    };
    //que tenga 50 caracteres máximo
    validador.max= function(campo, tamano){
        return campo!==undefined && tamano!==undefined && campo.length<=tamano;
    };
    //El password debe tener una longitud mínima de 6 caracteres,
    //y contener al menos una letra minúscula, una letra mayúscula y un dígito.
    validador.password=function(campo){
        var mayuscula = /[A-Z]/;
        var minuscula = /[a-z]/;
        var digito = /[0-9]/;
        return campo!==undefined && campo.length>=6 && mayuscula.test(campo) && minuscula.test(campo) && digito.test(campo);
    };
    validador.checked=function(campo){
        return campo!==undefined && campo;
    };
    validador.submit=function(campo){
        //esto hará que se pare lo que haga por defecto. Por ejm., si es un enlace, dejará de ir donde tenga que ir
        e.preventDefault();
        e.stopPropagation();
    };
    return validador;
})();



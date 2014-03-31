//Ejercicio 2 HTML 5. Editor de textos
//TODO: no funciona
window.$ = function(selector){
    var elems = document.querySelectorAll(selector);
    return (elems.length===1) ? elems[0] : elems;
};
function negrita(){
    document.execCommand('bold',false,null);
}

var editor = (function(){
    "use strict";
    //todo debería estar aquí dentro para que nada se ejecuta hasta que el navegador esté cargado
    window.onload = function(){
        document.designMode = 'on';
        var save = $('#save');
        var negrita = $('#negrita');
        save.addEventListener('click', guardar);
        negrita.addEventListener('click', negrita);
    };

    var guardar=function(e){
        console.log("texto guardado");

    };
    var negrita=function(e){
        console.log("negrita");
        document.execCommand('bold',false,null);
    };


    return editor;
})();

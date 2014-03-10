//Ejercicio 15
//Este es el esquema típico para que pueda ejecutarse muestra cuando clican estando en una
var muestra = (function(){
    "use strict";
    var muestra = function(){
        var enlaces=document.querySelectorAll('.enlace');
        if(enlaces.length > 0){
            enlaces[0].classList.add('oculto');
        }
        var parrafo = enlaces[0].previousElementsSibling;
        var spans=parrafo.querySelectorAll('span.oculto');
        if(spans.length>0){
            spans[0].classList.remove('oculto');
        }
    };
    return muestra;
})();

//crear vble global para escribir $ en vez de
window.$ = Element.prototype.$ =function(selector){
    var that = (this instanceof Element) ? this : document;
    var elems = that.querySelectorAll(selector);
    return (elems.length===1) ? elems[0] : elems;
};
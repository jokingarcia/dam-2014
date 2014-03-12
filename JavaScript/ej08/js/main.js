//Ejercicio 13: expresiones regulares
//
window.$ = function(selector){
    var elems = document.querySelectorAll(selector);
    return (elems.length===1) ? elems[0] : elems;
};
var anade = (function(){
    "use strict";
    //Crear una expresión regular valide una fecha en formato "XX/XX/XXXX", donde "X" es un dígito.
    //Probarlo con la expresión: "Nací el 05/04/1982 en Donostia.".
    var fecha=/(0[1-9]|[1-2][0-9]|30|31)\/(0[1-9]|1[0-2])\/\d{4}/;
    console.log(fecha.test("Nací en donosti el 05/04/1982"));
    console.log(fecha.test("Nací en donosti el 30/02/1982"));
    console.log(fecha.test("Nací en donosti el 30/13/1982"));
    console.log(fecha.test("Nací en donosti el 30/00/1982"));
    console.log(fecha.test("Nací en donosti el 99/04/1982"));
    console.log("Nací en Donosti el 05/04/1984".match(fecha));

    //email
    var email=/^(\w+)((\.|-|_)(\w+))*@(\w+)(\.\w{2,})+$/;
    console.log(email.test("jokingarcia75@hotmail.com"));
    console.log(email.test("a@a.com"));
    console.log(email.test("arkaitz.garro@ehu.com.es"));
    console.log(email.test("ark@gmail.c"));
    console.log(email.test(".@gmail.com"));

    var anade = function(){

    };
    return anade;
})();



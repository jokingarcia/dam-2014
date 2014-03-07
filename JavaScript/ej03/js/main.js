//Comprobar si un DNI es válido
var APP = APP||{};
APP.tipoPalabra = (function(){
    "use strict";

    var isUpperCase = function(word){
        var upper = word.toUpperCase();
        return isNaN(word) && word==upper;
    };
    var isLowerCase = function(word){
        var lower = word.toLowerCase();
        return isNaN(word) && word==lower;
    };
    var isMix = function(word){
        var lower = word.toLowerCase();
        var upper = word.toUpperCase();
        return isNaN(word) && word!=upper && word!=lower;
    };
    var tipoPalabra = function(word){
       if(isUpperCase(word)){
            return "isUpperCase";
       }else if(isLowerCase(word)){
            return "isLowerCase";
       }else{
            return "isMix";
       }

    }
   return tipoPalabra;

})();
console.log(APP.tipoPalabra("sldfijaosd"));
console.log(APP.tipoPalabra("sdfDIIdf"));
console.log(APP.tipoPalabra("DDDDDDD"));

//Comprobar si una palabra es palíndromo
var APP = APP||{};
APP.isPalindrome = (function(){
    "use strict";

    var isPalindrome = function(word){
        var pal=word.trim().replace(/ /gi, "").toLowerCase();
        var reversedword = pal.split("").reverse().join("");
        return word==reversedword;
    };


    return isPalindrome;

})();
console.log(APP.isPalindrome('radar'));
console.log(APP.isPalindrome('Antonio'));
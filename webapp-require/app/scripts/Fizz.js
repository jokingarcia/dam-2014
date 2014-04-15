'use strict'
define(
     'Fizz',
     [],
     function()   {

         var Fizz = function(number){
           var result = '';

             if (isFizz(number)) {
                 result = 'Fizz';
             }

             return result;
         };

         var isFizz = function(number){
            return (number % 3 == 0);
         };

         // export  public  API
         return {
             Fizz : Fizz,
             isFizz : isFizz,
         };
     }
);
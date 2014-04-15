'use strict'
define(
     'Buzz',
     [],
     function()   {
         // do  something

         var Buzz = function(number){
            //CUIDADO: Aquí en number puede venir cualquier cosa
             var result = '';
             if (isBuzz(number)) {
                 result = 'Buzz';
             }

             return result;
         };

          var isBuzz = function(number){
            return (number % 5 == 0);
         };

         // export  public  API
         return {
             Buzz : Buzz,
             isBuzz : isBuzz,
         };
     }
);
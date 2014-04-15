'use strict'
define(
     'FizzBuzz',
     //Dependencias: FizzBuzz depende de Fizz y de Buzz
     ['Fizz', 'Buzz'],
     //El require nos pasa el Fizz y el Buzz como parámetro
     function(Fizz, Buzz)   {
         // do  something


        var FizzBuzz = function(number){

            var result = Fizz.Fizz(number) +  Buzz.Buzz(number);
             if (result != 'FizzBuzz') {
                 result = '';
             }

            return result;
         };

         // export  public  API
         return {
             FizzBuzz : FizzBuzz,
         };
     }
);
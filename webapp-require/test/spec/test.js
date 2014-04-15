/* global describe, it */

(function () {
    'use strict';
    require.config({
        baseUrl:'../app/scripts',
        nodeRequire: require
    });

    describe('Test de FizzBuzz', function(){

        var fizz;
        var buzz;
        var fizzbuzz;
        beforeEach(function(done){
            require(['Fizz'], function(Fizz){
                fizz =   Fizz;
                done();//indica el fin del asincronismo
            });
             require(['Buzz'], function(Buzz){
                buzz =   Buzz;
                done();//indica el fin del asincronismo
            });
             require(['FizzBuzz'], function(FizzBuzz){
                fizzbuzz =   FizzBuzz;
                done();//indica el fin del asincronismo
            });
        });
        describe('isFizz testing',   function(){
            it('should return false',   function(){
                assert.equal(fizz.Fizz(1), false);
                //El strictEqual también comprueba el tipo
                assert.strictEqual(fizz.isFizz(1), false);
                assert.strictEqual(fizz.isFizz(2), false);
                assert.strictEqual(fizz.isFizz(4), false);
                assert.strictEqual(fizz.isFizz(5), false);
                assert.strictEqual(fizz.isFizz(), false);
            });
        });
        describe('isFizz testing',   function(){
            it('should return true',   function(){
                assert.strictEqual(fizz.isFizz(3), true);
            });
        });

        describe('Fizz testing',   function(){
            it('should return vacio',   function(){
                assert.equal(fizz.Fizz(1), '');
                //El strictEqual también comprueba el tipo
                assert.strictEqual(fizz.Fizz(1), '');
                assert.strictEqual(fizz.Fizz(2), '');
                assert.strictEqual(fizz.Fizz(4), '');
                assert.strictEqual(fizz.Fizz(5), '');
                assert.strictEqual(fizz.Fizz(), '');
            });
        });
        describe('Fizz testing',   function(){
            it('should return Fizz',   function(){
                assert.strictEqual(fizz.Fizz(3), 'Fizz');
            });
        });

         describe('isBuzz testing',   function(){
            it('should return false',   function(){
                assert.strictEqual(buzz.isBuzz(1), false);
                assert.strictEqual(buzz.isBuzz(2), false);
                assert.strictEqual(buzz.isBuzz(3), false);
                assert.strictEqual(buzz.isBuzz(4), false);
                assert.strictEqual(buzz.isBuzz(), false);
            });
        });
        describe('isBuzz testing',   function(){
            it('should return true',   function(){
                assert.strictEqual(buzz.isBuzz(5), true);
            });
        });

        describe('Buzz testing',   function(){
            it('should return vacio',   function(){
                assert.strictEqual(buzz.Buzz(1), '');
                assert.strictEqual(buzz.Buzz(2), '');
                assert.strictEqual(buzz.Buzz(3), '');
                assert.strictEqual(buzz.Buzz(4), '');
                assert.strictEqual(buzz.Buzz(), '');
            });
        });
        describe('Buzz testing',   function(){
            it('should return Buzz',   function(){
                assert.strictEqual(buzz.Buzz(5), 'Buzz');
            });
        });

        describe('FizzBuzz testing',   function(){
            it('should return FizzBuzz if mod 15 = 0',   function(){
                assert.strictEqual(fizzbuzz.FizzBuzz(1), '');
                assert.strictEqual(fizzbuzz.FizzBuzz(2), '');
                assert.strictEqual(fizzbuzz.FizzBuzz(3), '');
                assert.strictEqual(fizzbuzz.FizzBuzz(4), '');
                assert.strictEqual(fizzbuzz.FizzBuzz(5), '');
                assert.strictEqual(fizzbuzz.FizzBuzz(15), 'FizzBuzz');
                assert.strictEqual(fizzbuzz.FizzBuzz(), '');

            });
        });
       /* describe('FizzBuzz testing',   function(){
            it('should return vacio',   function(){
                var resp = fizzbuzz.FizzBuzz(fizz, buzz, 1);
                assert.equal(resp, '');
            });
        });
        describe('FizzBuzz testing',   function(){
            it('should return vacio',   function(){
                var resp = fizzbuzz.FizzBuzz(fizz, buzz);
                assert.equal(resp, '');
            });
        });*/

    });

})();

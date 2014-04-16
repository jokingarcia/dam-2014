/* global describe, it */

(function () {
    'use strict';

    require.config({
        baseUrl:'../app/scripts',
        paths :{
            'ydn-db': '../bower_components/ydn-db/jsc/ydn.db-dev'
        },
        'ydn-db':{
            exports : 'ydn'
        }
    });

    var twit = {
        id : 1,
        text : 'texto'
    };
    var newtwit = {
        id : 1,
        text : 'nuevotexto'
    };
    var twit2 = {
        id : 2,
        text : 'texto2'
    };
    describe('Database module', function () {
        var DB;
        beforeEach(function(done){
            require(['data'], function(data){
                DB =   data;
                done();//indica el fin del asincronismo
            });
        });

         //El done se usa para comprobaciones asíncronas
        describe('addTwit',   function(){
            it('add twit',   function(done){
                DB.addTwit(twit,
                function(){done();},function(error){throw error;});
            });
            it('add twit 2',   function(done){
                DB.addTwit(twit2,
                function(){done();},function(error){throw error;});
            });
        });
        describe('getTwit',   function(){
            it('get twit',   function(done){
                DB.getTwit('1',
                function(){
                    done();
                },
                function(error){throw error;});
            });
        });
        describe('updateTwit',   function(){
            it('update twit',   function(done){
                DB.updateTwit(newtwit,
                function(){done();},function(error){throw error;});
            });
        });
        describe('removeTwit',   function(){
            it('remove twit',   function(done){
                DB.removeTwit(2,
                function(number){
                    console.log(number);
                    if(number==1){
                        done();
                    }else{
                        throw error;
                    }

                },function(error){throw error;});
            });
        });
    });
})();

/* global describe, it */

(function () {
    'use strict';

    require.config({
        baseUrl : '../../app/scripts/',
        paths : {
             jquery: '../bower_components/jquery/dist/jquery',
             handlebars: '../bower_components/handlebars.js/dist/handlebars',
        },
        shim : {
             handlebars: {
                 exports : 'Handlebars'
             }
        }
    });

    describe('UI module', function () {
        var ui, ctrl, srv, DB;

        beforeEach(function(done){
            require(['UI', 'Controller', 'Service', 'Data'], function(UI, Controller, Service, Data){
                ui = UI;
                ctrl = Controller;
                srv = Service;
                DB = Data;

                done();
            });
        });

        // afterEach(function(done){
        //     done();
        // });

        describe('#showTweetsList', function () {

            it('Show a list of tweets in the html', function (done) {
                //comprobar numero de hijos usando jquery
                ui.showTweetsList([
                    {
                        id : 1,
                        text : 'tweet de prueba'
                    }
                ], function(){
                    assert.equal($('#twitter-list').children().length, 1);
                    done();
                });


            });
            it('Show a list of tweets from the database', function (done) {
                // Obtener de la BD
                //success, error
               DB.getTweets(
                function(tweets){
                    ui.showTweetsList(
                        tweets,
                        function(){
                            assert.equal($('#twitter-list').children().length, 100);
                            done();
                        }
                    )

                });


            });
        });
    });
})();
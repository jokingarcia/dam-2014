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
            it('One tweet is correctly printed', function () {
                ui.showTweetsList([
                    {id : 1, text : 'Testing showTweetsList method'}
                ]);
                assert.equal($('#twitter-list').children().length, 1);
            });
            it('All tweets are correctly printed', function () {
                ctrl.getTweetsFromTwitter(function(){
                    DB.getTweets(function(tweets){
                        ui.showTweetsList(tweets);
                        assert.equal($('#twitter-list').children().length, 100);
                    });
                });
            });
        });
    });
})();
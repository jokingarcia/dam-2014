/* global describe, it */

(function () {
    'use strict';

    require.config({
        baseUrl : '../../app/scripts/',
        paths : {
            jquery: '../bower_components/jquery/dist/jquery',
        },
        shim : {
            // 'ydn-db': {
            //     exports : 'ydn'
            // }
        }
    });

    describe('Controller module', function () {
        var ctrl, srv;

        beforeEach(function(done){
            require(['Controller, Service'], function(Controller, service){
                ctrl = Controller;
                srv = service;
                sinon.spy(srv, 'getTweets');
                //sinon.spy(DB, 'addTweets');
                done();
            });
        });

        afterEach(function(done){
            getTweets.restore();
            addTweets.restore();
            done();
        });

        describe('#getTweetsFromTweeter', function () {
            it('Get all tweets from tweeter and save in DB', function () {
                ctrl.getTweetsFromTweeter();
                assert.isTrue(srv.getTweets.calledOnce, 'getTweets not called');
                assert.isTrue(DB.addTweets.calledOnce, 'addTweets not called');
                done();
            });

        });
    });
})();
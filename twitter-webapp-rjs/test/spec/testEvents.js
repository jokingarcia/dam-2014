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

    describe('Events module', function () {
        var events, $, ctrl;

        beforeEach(function(done){
            require(['Controller', 'jquery', 'Events'], function(Controller, jQuery, Events){
                ctrl = Controller;
                $ = jQuery;
                events = Events;

                //sinon.spy(ctrl, 'showLatestsTweets');
                done();
            });
        });

        afterEach(function(done){
            //ctrl.showLatestsTweets.restore();
            done();
        });

        describe('#showLatestsTweets', function () {
            it('showLatestsTweets has been called', function (done) {
                var errTimeout = setTimeout(function(done){
                    assert(false, 'Event never fired');
                    done();
                })
                $(document).on('datachange', function(){
                    clearTimeout(errTimeout);
                    assert(true);
                    done();
                });
                document.dispatchEvent(new Event('datachange'));

            });

        });
    });
})();
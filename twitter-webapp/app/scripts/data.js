'use strict'
define(
     'data',
     //Dependencias: FizzBuzz depende de Fizz y de Buzz
     ['ydn-db'],
     //El require nos pasa el Fizz y el Buzz como parámetro
     function()   {
         // do  something
        var dbname = 'twitter';
        var storename = 'twits';
        var db = new ydn.db.Storage(dbname);

        var addTwit = function(twit, success, error){
            var req = db.put({name : storename, keyPath: 'id'}, twit);
            req.done(success);
            req.fail(error);

        };

        var getTwit = function(twitid, success, error){
            var req = db.get(storename, twitid);
            req.done(success);
            req.fail(error);
        };
         //update
        var updateTwit = function(twit, success, error){
            var req = db.put({name : storename, keyPath: 'id'}, twit);
            req.done(success);
            req.fail(error);
        };
         //delete
        var removeTwit = function(twitid, success, error){
            var req = db.remove(storename, twitid);
            req.done(success);
            req.fail(error);
        };
         // export  public  API
        return {
            addTwit : addTwit,
            getTwit : getTwit,
            updateTwit : updateTwit,
            removeTwit : removeTwit
        };
    }
);
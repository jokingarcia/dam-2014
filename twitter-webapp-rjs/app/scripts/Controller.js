define('Controller', ['Data', 'Service'], function(DB, srv){
    'use strict';
    var getTweetsFromTwitter = function (){
        //console.log("getTweetsFromTwitter");
        srv.getTweets({}, processTweets, error);
    };
    var processTweets = function(data){
        var tweets =[];
        if(data && data.statuses && data.statuses.length >0){
            for (var i = data.statuses.length - 1; i >= 0; i--) {
                //hay que meter id_str, user, created_at y text
                var tweet;
                tweet.created_at = data.statuses[i].created_at;
                tweet.id_str = data.statuses[i].id_str;
                tweet.user = data.statuses[i].user;
                tweet.text = data.statuses[i].text;
                // var tweet = {"created_at": data.statuses[i].created_at,
                //             "id_str" : data.statuses[i].id_str,
                //             "user" : data.statuses[i].user,
                //             "text" : data.statuses[i].text};
                console.log("tweet: "+tweet);
                tweets[i] = tweet;
            };
        }
    }

    return{
        getTweetsFromTwitter : getTweetsFromTwitter
    };
})
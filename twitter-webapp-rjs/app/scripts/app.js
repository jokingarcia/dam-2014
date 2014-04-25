define(['Controller', 'Data'], function(Controller, Data) {
  console.log('App started');
  Controller.getTweetsFromTwitter();
  Controller.showLatestTweets();
});
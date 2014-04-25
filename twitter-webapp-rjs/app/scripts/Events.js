define('Events', ['quo', 'Controller'], function($, Controller){
    'use strict';

    $(document).on('datachange', Controller.showLatestTweets);


});
//NUNCA usar esto (javascript) para hacer animaciones
$(function(){
    "use strict";
    var $boxes = $('.box');
    var $width = $(document).width();
      $boxes.css({
        'width' : '50px',
        'height' : '50px',
        'color' : 'yellow',
        'background-color' : 'blue',
        '-webkit-transform' : 'translateX('+ ($width - 100) + 'px)',
        '-webkit-transition-property' : 'all',
        '-webkit-transition-duration' : '1s'
     });


});
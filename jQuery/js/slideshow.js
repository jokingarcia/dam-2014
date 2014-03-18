//Convertimos una lista de imágenes en un slideshow para pasarlas con la librería de jquery bxslider
//también hacemos que cuando se pinche en una imagen se haga grande con la librería: fancybox
$(document).ready(function(){
  var $slideshow = $('.bxslider').bxSlider({
    'mode':'fade',
    'pager':false,
     'controls':false,
     //Usamos callbacks. Estos atributos en la documentación
     //'onSlideBefore' : onSlideBefore,
     //'onSlideAfter' : onSlideAfter
 });
    $(".fancybox").fancybox();
    var previous = function(e){
        e.preventDefault();
       $slideshow.goToPrevSlide();
    };
    var next = function(e){
         e.preventDefault();
       $slideshow.goToNextSlide();
    };

    //NOTA: poniendo addEventListener no funciona pq el selector te devuelve un objeto de jquery. Usar on
   $('#previous').on('click', previous);
    $('#next').on('click', next);
});

//Mejor usar delegación de eventos
// $(document).on('click', '#previous', function(e){
//     //Selecciono los índices cogiendo del atributo data del html: (data-target slideshow)
//     //(cuando hay varios slideshow para decidir dónde pincho)
//     var target = ;
//     $slideshow.goToPrevSlide();
// })

    // $(document).ready(function() {
    //     $(".fancybox").fancybox();
    // });

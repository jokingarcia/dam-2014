//6.5.2 Crear un menu desplegable
$(document).ready(function(){
    'use strict';
    //Al pasar el puntero del ratón por encima de un ítem del menú, se debe mostrar su submenú en caso que exista;

    $("#nav.li").hover(function() {
        $(this).addClass('hover')
                .find('ul').show();
    },function(){
        $(this)
            .removeClass('hover')
            .find('ul').hide();
    })
    });

    //Al no estar más encima de un ítem, el submenú se debe ocultar.

});
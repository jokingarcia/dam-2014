$(document).ready(function(){
    'use strict';
    //1-Ocultar todos los elementos div.module;
    var divmodule = $('div.module');
    divmodule.hide();
    //2-Crear una lista desordenada antes del primer div.module para utilizar como pestañas;
    var divmodulefirst = $('div.module:first');
    var $myNewElement = $('<ul id="new"></ul>');
    $myNewElement.insertBefore(divmodulefirst);
    //3-Interactuar con cada div utilizando $.fn.each. Por cada uno, utilizar el texto del elemento h2 como el texto
    // para el ítem de la lista desordenada;
    var lis =[];
    divmodule.each(function(idx, el) {
        var $module = $(this);
        //El this aquí dentro es del DOM, no del jquery
        var h2text = divmodule.find('h2').first().text();
        //console.log(h2text);
        var $myNewLi = $('<li>'+h2text+'</li>');
       $myNewLi.data('target', $module);
       lis.push($myNewLi.get(0));//obtener el elemento del DOM del jquery

    });
    $myNewLi.append(lis).insertBefore($modules.eq(0));
    //4-Vincular un evento click a cada ítem de la lista de forma que:
    //Muestre el div correspondiente y oculte el otro;
    //Añada la clase "current" al ítem seleccionado;
    //Remueva la clase "current" del otro ítem de la lista;
    //TODO: NOTA: data para guardar el div en el li
    //NOTA: añadir listener
    $(document).on('click', '.tabs li', function(e){
        var $this=$(this);
        $this.addClass('current').siblings('.current').removeClass('current');
        $this.data('target').show().siblings('.module').hide();
    });

    //5-Finalmente, mostrar la primera pestaña.

});
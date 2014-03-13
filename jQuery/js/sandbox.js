$(function(){
    'use strict';
    //EJERCICIO 3.8.1
    //Seleccionar todos los elementos div que poseen la clase "module".
    var $divs = $('div.module');
    console.log($divs);
    //Especificar tres selecciones que puedan seleccionar el tercer ítem de la lista desordenada #myList.
    //¿Cuál es el mejor para utilizar? ¿Porqué?
    // var $li = $('#myList li').eq(2);
    // console.log($li[0]);
    // $li = $('#myList').find('li').eq(2);
    // console.log($li[0]);
    // $li = $('#myList li:nth-child(3)');
    // console.log($li[0]);
    // $li = $('#myListItem');
    //console.log($li[0]);
    //Seleccionar el elemento label del elemento input utilizando un selector de atributo.
    //var $label = $('input[name=q]').closest('form').find('label[for="' +input.attr('name') +'"]');
    //console.log($label);
    //Averiguar cuantos elementos en la página están ocultos (ayuda: .length)
    //var $ocultos = $(':hidden').length;
    //console.log($ocultos);
    //cuantas imagenes tiene el atributo alt
    //var img = $('img[alt]');
    //Seleccionar todas las filas impares del cuerpo de la tabla
    //var $filas=$('tbody tr:odd').css('background-color', 'gray');

    //EJERCICIO 3.8.2: Recorrer el DOM: each, closest
    //Seleccionar todas las imágenes en la página; registrar en la consola el atributo alt de cada imagen.
    var $imagen = $('img[alt]');
    $('img[alt]').each(function(idx, el) {
         console.log(
             'El elemento ' + idx +
             'contiene el siguiente Alt: ' +
             $(el.alt)
         );
    });
    console.log($imagen);
    //Seleccionar el elemento input, luego dirigirse hacia el formulario y añadirle una clase al mismo.
    $('input[name=q]').closest('form').addClass('nueva');

    //Seleccionar el ítem que posee la clase "current" dentro de la lista #myList y remover dicha clase en el elemento;
    // luego añadir la clase "current" al siguiente ítem de la lista.
    var $item = $('#myList li.current');
    $item.removeClass('current');
    $item.next('#myList li').addClass('current');

    //Seleccionar el elemento select dentro de #specials; luego dirigirse hacia el botón submit.
    var $select = $('#specials select');
    var $submit =$select.closest('form').find('input[type=submit]');
    console.log($select);
    //Seleccionar el primer ítem de la lista en el elemento #slideshow; añadirle la clase "current" al mismo y luego
    // añadir la clase "disabled" a los elementos hermanos.
    $('#slideshow li:first-child').addClass('current').siblings().addClass('disabled');
    //console.log($);

    //Añadir 5 nuevos items al final de la lista #myList
    //Primero hacerlo mal y luego hacer el append fuera como en los apuntes
   /* var start,
        end;
    start = new Date();
    for (var i = 5000-1; i >= 0; i--) {
        $('<li>List item' + i+ '</li>').appendTo($('#myList'));
    }
    end = new Date();
    console.log('append dentro del for: ' + (end-start));*/
    //NUNCA HACEMOS APPENDS o SELECIONES DENTRO DE UN FOR
    for (var i=0; i<5; i++) {
         myItems.push('<li>item ' + i + '</li>');
    }

    $myList.append(myItems);
    //Remover los ítems impares de la lista.
    $lista=$('#myList li:even').remove();

    //Añadir otro elemento h2 y otro párrafo al último div.module.
    var $myNewElement = $('<p>Nuevo parrafo</p>');
    var $myNewH2 = $('<h2>New H2</h2>');
    $('div.module:last').append($myNewElement).append($myNewH2);

    //Añadir otra opción al elemento select; darle a la opción añadida el valor "Wednesday".
    //Las opciones tienen un objeto especial:
    //var opt = new Option('wednesday', 'Wednesday')
    $('select[name=day]').append('<option value="Wednesday">Wednesday</option>');
    //Añadir un nuevo div.module a la página después del último; luego añadir una copia de una de las imágenes
    // existentes dentro del nuevo div.
    $div = $('div.module').last();
    var $nuevo = $('</div>',{
        'class' : 'module',
        'id' : 'myModule'
    });
    //ES IMPORTANTE usar el .first() en vez de[0] para que me devuelva un objeto jquery y poder usar clone
    $nuevo.appen($imgs.first().clone()).insertAfter($div);


})();

//se muestra una lista de valores alternativos en el caso de que el nombre elegido no esté disponible
//{ disponible: "si" }
//{ disponible: "no", alternativas: ["...", "...", ..., "..."] }
$(function(){
    var $disponibilidad = $('#disponibilidad');
    var $comprobar = $('#comprobar');

    var hayDisponibilidad = function(e) {

            $.ajax({
                url : '../servidor/compruebaDisponibilidadJSON.php',
                data : { login : $('#login').val() },
                cache : false,
                dataType : 'json',
                success : function(json) {
                    if(json.disponible === "no"){
                         $disponibilidad.html('<p>' +json.alternativas+'</p>');
                    }else{
                        $disponibilidad.html('<p>ok</p>');
                    }

                    // $('<h1/>').text(json.title).appendTo('body');
                     //$('<div class="content"/>').html(json.html).appendTo('body');
                 },
                error : function(jqXHR, status, error) {
                    console.log(error);
                }
            });

    };


    $comprobar.on('click', hayDisponibilidad);


});
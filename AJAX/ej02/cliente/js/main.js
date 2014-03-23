// La página HTML proporcionada incluye una zona llamada ticker en la que se deben mostrar noticias generadas por el servidor.
//  Añadir el código JavaScript necesario para:

// 1-De forma periódica cada cierto tiempo (por ejemplo cada segundo) se realiza una petición al servidor mediante AJAX y
// se muestra el contenido de la respuesta en la zona reservada para las noticias.
// 2-Además del contenido enviado por el servidor, se debe mostrar la hora en la que se ha recibido la respuesta.
// 3-Cuando se pulse el botón "Detener", la aplicación detiene las peticiones periódicas al servidor. Si se vuelve a pulsar
// sobre ese botón, se reanudan las peticiones periódicas.
// 4-Añadir la lógica de los botones "Anterior" y "Siguiente", que detienen las peticiones al servidor y permiten mostrar
//  los contenidos anteriores o posteriores al que se muestra en ese momento.
// 5-Cuando se recibe una respuesta del servidor, se resalta visualmente la zona llamada ticker.
// 6-Modificar la aplicación para que se reutilice continuamente el mismo objeto XMLHttpRequest para hacer las diferentes
//  peticiones.

$(function(){
    var noticias = [],
        intervalo = null,
        actual = 0,
        playing = false;

    var $ticker    = $("#ticker");
    var $detener   = $("#detener");
    var $anterior  = $("#anterior");
    var $siguiente = $("#siguiente");

    var guardarNoticia = function(text) {
        var fechaHora = new Date();
        var hora = fechaHora.getHours().toString() + ":" + fechaHora.getMinutes().toString() + ":" + fechaHora.getSeconds().toString();

        noticias.push({
            hora: hora,
            titular: text
        });

        actual = noticias.length - 1;

        mostrarNoticia(noticias[actual]);
    };

    var mostrarNoticia = function(noticia){
        var $noticia = $('<span/>', {
            html : "<strong>" + noticia.hora + "</strong> " + noticia.titular
        });

        $ticker.html($noticia);
        $ticker.css('background-color', '#FFFF99');

        setTimeout(limpiaTicker, 300);
    };

    var limpiaTicker = function(){
        $ticker.css('background-color', '#FAFAFA');
    };

    var iniciarIntervalo = function() {
        $anterior.attr('disabled', true);
        $siguiente.attr('disabled', true);

        intervalo = setInterval(function() {
            $.ajax({
                url : '../servidor/generaContenidos.php',
                cache : false,
                success : guardarNoticia,
                error : function(jqXHR, status, error) {
                    console.log(error);
                }
            });
        }, 3000);
    };

    var detenerIntervalo = function() {
        clearInterval(intervalo);

        $anterior.attr('disabled', false);
        $siguiente.attr('disabled', false);
    };

    var toggleIntervalo = function() {
        if(playing) {
            playing = false;
            detenerIntervalo();
        } else {
            iniciarIntervalo();
            playing = true;
        }
    };

    var anteriorNoticia = function() {
        actual = (actual === 0) ? noticias.length - 1 : --actual;

        mostrarNoticia(noticias[actual]);
    };

    var siguienteNoticia = function() {
        actual = (actual === noticias.length -1 ) ? 0 : ++actual;

        mostrarNoticia(noticias[actual]);
    };

    toggleIntervalo();
    $detener.on('click', toggleIntervalo);
    $anterior.on('click', anteriorNoticia);
    $siguiente.on('click', siguienteNoticia);

});
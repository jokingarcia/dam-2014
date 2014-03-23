//1- Al cargar la página, el cuadro de texto debe mostrar por defecto la URL de la propia página.
//2- Al pulsar el botón "Mostrar Contenidos", se debe descargar mediante peticiones AJAX el contenido correspondiente a la
// URL introducida por el usuario. El contenido de la respuesta recibida del servidor se debe mostrar en la zona de
//   "Contenidos del archivo".
//3- En la zona "Estados de la petición" se debe mostrar en todo momento el estado en el que se encuentra la petición
// (No inicializada, cargando, completada, etc.)
//4- Mostrar el contenido de todas las cabeceras de la respuesta del servidor en la zona "Cabeceras HTTP de la respuesta del
//  servidor".
//5- Mostrar el código y texto de estado de la respuesta del servidor en la zona "Código de estado".
$(function() {
    var $contenidos = $('#contenidos');
    var $estado     = $('#estado');
    var $estados    = $('#estados');
    var $cabeceras  = $('#cabeceras');
    var $codigo     = $('#codigo');
    var $recurso    = $('#recurso');
    var estadosPosibles = ['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];
    var tiempoInicial = 0;
    //url que esté en el navegador
    $recurso.val(window.location);

    var cargarContenido = function(e) {
        if($recurso.val().trim().length > 0) {
            borrarContenido();

            tiempoInicial = new Date();

            $.ajax({
                url : $recurso.val(),
                cache : false,
                //Callback for creating the XMLHttpRequest object.
                xhr : function() {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        var tiempoFinal = new Date();
                        var milisegundos = tiempoFinal - tiempoInicial;

                        $estados.html($estados.html() + "[" + milisegundos + " mseg.] " + estadosPosibles[xhr.readyState] + "<br/>");
                    };

                    return xhr;
                },
                success : muestraContenido,
                error : muestraError
            });
        } else {
            alert('Introduce una URL');
        }
    };

    var muestraContenido = function(data, textStatus, jqXHR) {
        $contenidos.text(data);
        //getAllResponseHeaders devuelve las cabeceras HTTP
        //El objeto jqXHR es una extensión del XMLHttpRequest
        $cabeceras.text(jqXHR.getAllResponseHeaders());
        $codigo.html(jqXHR.status + "<br/>" + jqXHR.statusText);
    };

    var muestraError = function(jqXHR, textStatus, errorThrown) {
        $codigo.html(jqXHR.status + "<br/>" + jqXHR.statusText);
        console.log('Se ha producido un error al procesar la peticiÃ³n.');
    };

    var borrarContenido = function() {
        $contenidos.html('');
        $estados.html('');
        $cabeceras.html('');
        $codigo.html('');
    };

    $('#enviar').on('click', cargarContenido);
});
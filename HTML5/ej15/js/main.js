$(function () {
    "use strict";

    // Obtener los elementos del DOM

    // Mi color asignado por el servidor
    var myColor = false;
    // Mi nick
    var myName = false;

    // Comprobar la disponibilidad de Web Socket en el navegador
    // if (!modernizr.WebSocket) {
    //     return false;
    // }

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // Abrir la conexion con ws://www.arkaitzgarro.com:1337
    // 1. Al abrir la conexión, solicitar el nick.
    // 2. Controlar posibles errores del servidor.
    // 3. Escucar los mensajes del servidor, y mostrarlos en el elemento "content"
    // 4. La estructura del objeto enviado por el servidor es la siguiente:
    //      {
    //          // Contiene el tipo de mensaje recibido
    //          type : @string in ['color', 'history', 'message'],
    //          // Contiene los datos según el tipo de mensaje recibido
    //          data: @Object {author, text, color, time}
    //      }
    // 5. Enviar un mensaje al pulsar enter. El mensaje enviado es únicamente la cadena de caracteres.

    var socket = new WebSocket('ws://www.arkaitzgarro.com:1337');

    $(document).on('click','#send',function(e){
        console.log($('#input').val());
        socket.send($('#input').val());
    });


    socket.onopen  = function(e){
        console.log("Welcome - status "+this.readyState);
        $('#input')[0].disabled=false;

    };
    socket.onclose = function(e){ console.log("Disconnected - status "+this.readyState); };

    //Escuchar mensajes del servidor
    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        if (data.type == 'color') {
             myColor=data.data;
            console.log("myColor: "+myColor);
        } else if(data.type == 'history'){

              $.each(data.data, function(dataitem) {//dataitem tiene el índice, es decir, un número

                     addMessage(data.data[dataitem].author, data.data[dataitem].text,
                      data.data[dataitem].color, data.data[dataitem].time);
                });
         }else{ //message
                //console.log(data.data.text);
                addMessage(data.data.author, data.data.text, data.data.color, data.data.time);
         }
    };

    /**
     * Añadir el mensaje a la ventana de chat
     */
    function addMessage(author, message, color, dt) {
        console.log("addMessage");
        $('#content').prepend('<p><span style="color:' + color + '">' + author + '</span> @ ' +
              // (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':' +
              // (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()) +

              ': ' + message + '</p>');
    }
});
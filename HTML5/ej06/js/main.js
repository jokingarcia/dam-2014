//Ejercicio 3 HTML 5. Formulario
$(document).ready(function(){
    "use strict";
    var video = $('#firstvideo');
   //Reproducir los vídeos independientemente del codec soportado por el navegador.
  //Incluir controles de reproducción, pausa, parar, avanzar y retroceder 10  segundos, inicio y fin.
  // Control de volumen y paso a pantalla completa.
  // Un indicador de progreso de la reproducción.
   $(document).on('click','#play',function(e){
        console.log("play");
         video[0].play();
  });
    $(document).on('click','#pause',function(e){
        console.log("pause");
         video[0].pause();
  });
  $(document).on('click','#stop',function(e){
        console.log("stop");
        //OJO: hay que poner [0] aunque solo haya uno
        video[0].currentTime=0;
        video[0].pause();
  });
  $(document).on('click','#forward',function(e){
        console.log("forward");
         video[0].currentTime = video[0].currentTime + 10;
  });
  $(document).on('click','#backward',function(e){
        console.log("backward");
        video[0].currentTime = video[0].currentTime - 10;
  });
  $(document).on('click','#start',function(e){
        console.log("start");
        video[0].currentTime = 0;
  });
  $(document).on('click','#end',function(e){
        console.log("end");
        video[0].currentTime = video[0].duration;
  });
  $(document).on('click','#fullscreen',function(e){
        console.log("fullscreen");
       //TODO: aquí habría que  hacerlo para diferentes navegadores
        video[0].webkitEnterFullScreen();
  });
  $(document).on('click','#volume',function(e){
        console.log("volume");
        video[0].volume = $('#volume')[0].value/100;
  });
  function updateProgress() {
     console.log("updateProgress");
      var progress = document.getElementById('progress');
      progress.value = parseInt(video[0].currentTime);
     //   $('#progress')[0].val=parseInt(video[0].currentTime);
    }
  video[0].ontimeupdate = updateProgress;


});
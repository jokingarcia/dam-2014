//Ejercicio 8 HTML 5. Web Storage: SessionStorage y LocalStorage
$(document).ready(function(){
    "use strict";
 //   $('#texto')[0].value=sessionStorage.getItem('texto');
//Crear una caja de texto, a modo de editor de contenidos, y utilizando
// SessionStorage almacenar el contenido de la caja en cada pulsación de
// tecla. Si la página es recargada, el último contenido almacenado debe
// mostrarse en la caja de texto. Comprobad que cerrando la pestaña
// actual, o abriendo una nueva ventana, los datos no se comparten
 /*$(document).on('keypress','#texto',function(e){
        console.log("saved");
        sessionStorage.setItem('texto', $('#texto')[0].value);

  });*/
// Modificar el código anterior para utilizar LocalStorage. Comprobad que
// en este caso, aunque cierre la ventana o abra una nueva, los datos se
// mantienen. Añadir la posibilidad de actualizar el resto de ventanas
// abiertas, cada vez que se modifique el valor de la caja de texto en
// cualquiera de ellas


 $('#texto')[0].value=localStorage.getItem('texto');
 $(document).on('keyup','#texto',function(e){
        console.log("saved");
        localStorage.setItem('texto', $('#texto')[0].value);

  });
function handleStorage(event) {
  event=event||window.event;
  console.log("handleStorage");
  if (event.newValue === null) { // it was removed
    console.log("true");
    $('#texto')[0].val=localStorage.getItem('texto');
  } else {
    console.log("false");
    $('#texto')[0].val=localStorage.getItem('texto');
  }
}
  if(window.addEventListener){
          window.addEventListener('storage', handleStorage(this), false);
        }else{
         window.attachEvent('onstorage', handleStorage(this));
       }

});
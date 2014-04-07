//Ejercicio 12 HTML 5. Http2

$(document).ready(function(){
    "use strict";
   /* Supongamos que tienes una galería de imágenes y quieres recuperar un grupo de imágenes para, a continuación,
    guardarlas localmente con el sistema de archivos HTML5
Una forma de conseguir esto sería solicitar imágenes como ArrayBuffer, crear
un Blob a partir de los datos y escribir el blob con FileWriter:*/

window.requestFileSystem = window.requestFileSystem ||
window.webkitRequestFileSystem;
function onError(e) {
 console.log('Error', e);
}
 var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost/HTML5/ej12/imagenes/imagen.jpg', true);
xhr.responseType = 'arraybuffer';
xhr.onload = function(e) {
    console.log("onload");
 window.requestFileSystem(TEMPORARY, 1024 * 1024, function(fs) {
 fs.root.getFile('imagen.jpg', {create: true}, function(fileEntry) {
 fileEntry.createWriter(function(writer) {
 writer.onwrite = function(e) {};
 writer.onerror = function(e) {};
 var bb = new BlobBuilder();
 bb.append(xhr.response);
 writer.write(bb.getBlob('image/jpg'));
 }, onError);
 }, onError);
 }, onError);
};




});
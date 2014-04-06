//Ejercicio 7: Geolocalización
$(document).ready(function() {
    // Calcular posición
    //Solicitar las coordenadas actuales, y mostrar dichas coordenadas (y la  precisión)
    //tanto en formato texto como un punto en el mapa
    //Acceder a la aplicación desde un navegador móvil
    // Realizar las modificaciones para obtener datos extra como velocidad, altura, …
     navigator.geolocation.getCurrentPosition(function(position) {
            var coords = position.coords;
            console.log(coords.latitude + "" + coords.longitude + "" + coords.accuracy);
            var label = document.createElement('label');
            //altitude - readonly attribute double altitude
            //document.write("altitude"+coords.altitude);
            //label.write("altitude"+coords.altitude);
            //altitudeAccuracy - readonly attribute double altitudeAccuracy
            //document.write("altitudeAccuracy"+coords.altitudeAccuracy);
            //heading - readonly attribute double heading
            //document.write("heading"+coords.heading);
            //speed - readonly attribute double speed
            //document.write("speed"+coords.speed);
          
            showMap(position);
            }, function(error) {
                console.log(error.code+""+error.message);
    });

    function showMap(position) {
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '400px';
        mapcanvas.style.width = '560px';

        document.querySelector('article').appendChild(mapcanvas);



        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "¡Usted está aquí!"
        });
    }
});
//script que cargue de forma dinámica mediante AJAX la lista de provincias de un país y
//la lista de los municipios de cada provincia seleccionada.
//{ "01": "Álava/Araba",  "02": "Albacete",  "03": "Alicante/Alacant", ...  }
//{ "0014": "Alegría-Dulantzi",  "0029": "Amurrio",  ...  }
 window.onload = $(function(){
    var $provincia = $("#provincia");
    var $municipio = $("#municipio");


            $.ajax({
                url : '../servidor/cargaProvinciasJSON.php',
                type : 'POST',
                //data : { provincia : '01' },
                cache : false,
                dataType : 'json',//te devuelve el objeto js
                //cargar los municipios en la lista desplegable
                //Propiedad innerHTML de la lista y código HTML de cada etiqueta <option>
                success : function(data, textStatus, jqXHR) {
                    if (data){
                         var options =[];
                        for (var i in data){
                            var $option = $('<option/>',{
                                value : i,
                                text : data[i],

                            });
                            options.push($option[0]);
                        }//for
                        $provincia.append(options);
                        //cargaMunicipios.call($provincia);
                    }

                 },
                error : function(jqXHR, status, error) {
                    console.log(error);
                }
            });


    var cargaMunicipios = function(e) {
        console.log('cargaMunicipios');
        $.ajax({
                url : '../servidor/cargaMunicipiosJSON.php',
                type : 'POST',
                data : { 'provincia' : $this.find(':selected').attr('value') },//TODO
                //data : { 'provincia' : '01' },
                cache : false,
                dataType : 'json',//te devuelve el objeto js
                //cargar los municipios en la lista desplegable
                //Propiedad innerHTML de la lista y código HTML de cada etiqueta <option>
                success : function(data, textStatus, jqXHR) {
                    if (data){
                        console.log(data);
                         var options =[];
                        for (var i in data){
                            var $option = $('<option/>',{
                                value : i,
                                text : data[i],

                            });
                            options.push($option[0]);
                        }//for
                        $municipio.append(options);

                    }


                    // $('<h1/>').text(json.title).appendTo('body');
                     //$('<div class="content"/>').html(json.html).appendTo('body');
                 },
                error : function(jqXHR, status, error) {
                    console.log(error);
                }
            });

    };

$(document).on('change', '#provincia', cargaMunicipios);


});
define('Service', ['jquery'], function($){
    var getTweets = function(config, success, error){
        //es mejor ajax que get o getJSON, porque aquí nos avisa si algo va mal
        $.ajax({
            //puedo usar una ruta absoluta porque tengo un virtual host para el proyecto: twitter.webapp
            url : '/data/tweets.json',
            type : 'POST',
            dataType : 'JSON',
            cache : false,
            success : function(data, textStatus, jqXHR) {
                console.log('success initialize tweets ajax');
            },
            error : function(jqXHR, status, error) {
                console.log(error);
            }
        });
    };

    return{
        getTweets : getTweets
    };
});
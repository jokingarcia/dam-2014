(function($){
    $.fn.stripe = function(color){
        var c = color || '#ccc'; //Si no me viene ningún color pongo uno por defecto
        //El this es cada una de las tablas del DOM
        return this.filter('table').each(function(){
            var $this = $(this);
            $this.find('tr:odd').css('background-color', c);
        }); //me aseguro que es una tabla
    };
})(jQuery);

$('table, div').stripe('#FFC');
//***********Este es nuestro plugin jQuery que valida un formulario**************************************
(function($){
    var opts;
     $form   = $(this);
        //Usamos los selectore se jQuery en vez de los de js
        //inputs = form.querySelectorAll('input[data-validator], textarea[data-validator], select[data-validator]'),
        //submit = form.querySelector('input[type="submit"]');
        //es una buena práctica poner el $ a las vbles. cuando son de jquery
        $inputs = $('input[data-validator], textarea[data-validator], select[data-validator]');
        $submit = $('input[type="submit"]');
        var errors = [];
    //Para crear el plugin tenemos que extender el prototipo de jQuery
    $.fn.validate = function(options){
        //El this es cada formulario
        //para cada formulario hay que ejecutar solo esto:
        opts = $.extend($.fn.validate.defaults, opts);
        //filtramos por formularios
        return this.filter('form').each(function(){
            //Anado los listeners que correspondan a los elmtos. según su tipo
            //Escuchar el submit, nunca el botón. Puede no haber botón
            $form.on('submit', validateForm);
            $form.on('blur validate', 'input[data-validator]', validateField);
            var $this = $(this);

        } );
    };//Fin validate
//Le añado una nueva propiedad a la función que acabo de crear. Porque LA FUNCION ES UN OBJETO
//Se hace así para que esto sea público y pueda ser modificado
 $.fn.validate.defaults = {
      'required' : {
            'error' : 'This field should not be blank.',
            'class' : 'error'
        },
        'email' : {
            'error' : 'This field is not a valid email.',
            'class' : 'error'
        },
        'password' : {
            'error' : 'This field is not a valid password',
            'class' : 'error'
        },
        'min' : {
            'error' : 'This field should be at least %1% character(s)',
            'class' : 'error'
        }
    };

    var disableSubmit = function() {
        if($submit) {
            $submit.value = "Validating...";
            $submit.disabled = true;
        }
    };

    var enableSubmit = function() {
        if($submit) {
            $submit.value = "Send";
            $submit.disabled = false;
        }
    };
    //e es el evento que la lanza
    //El this aquí haría ref. a un objeto del DOM
    var validateField = function(e) {
        if(APP.validator[this.dataset.validator]) {
            if(!APP.validator[this.dataset.validator](this.value)) {
                console.log(this, opts[this.dataset.validator].error);
                errors.push([this, opts[this.dataset.validator].error]);
                //si está mal lo pongo en rojo
                $(this).css('background-color', '#FF0000');
            }else{
                $(this).css('background-color', '#FFFFFF');
            }
        }
    };

    var validateForm = function(e) {
       // var ev = new Event('validate');
        errors = [];
        disableSubmit();
        for (var i = $inputs.length - 1; i >= 0; i--) {
            //Lanzo los eventos en cada elemento input
            //en jQuery el equivalente a dispatchEvent es trigger
            //$inputs[i].dispatchEvent(ev);
            $($inputs[i]).trigger('validate');
        }
        if(errors.length > 0) {
            e.preventDefault();
            enableSubmit();
            console.log('errors: '+errors);
        }
    };

    //form.addEventListener('submit', validateForm);
    //$form.on('submit', validateForm);
    //for (var i = $inputs.length - 1; i >= 0; i--) {
        //Añado los listeners
        //En jQuery usar .on en vez de .addEventListener
        //inputs[i].addEventListener('blur', validateField);
        //inputs[i].addEventListener('validate', validateField);
      //  $($inputs[i]).on('blur', validateField);
      //  $($inputs[i]).on('validate', validateField);
    //}

    /*function mergeRecursive(dst, src) {
        for (var p in src) {
            try {
                // Property in destination object set; update its value.
                if ( src[p].constructor==Object ) {
                    dst[p] = mergeRecursive(dst[p], src[p]);

                } else {
                    dst[p] = src[p];

                }
            } catch(e) {
                // Property in destination object not set; create it and set its value.
                dst[p] = src[p];

            }
        }

        return dst;
    }
*/






//MAIN.js
/*window.$ = Element.prototype.$ = function(selector) {
    var that = (this instanceof Element) ? this : document;
    var elems = that.querySelectorAll(selector);

    return (elems.length === 1) ? elems[0] : elems;
};*/


//*****************Esta es la llamada a la "extensión jquery"**************************************************
    $('#registro').validate({
        'required' : {
            'error' : 'This field should not be blank.',
            'class' : 'error'
        },
        'email' : {
            'error' : 'This field is not a valid email.',
            'class' : 'error'
        },
        'password' : {
            'error' : 'This field is not a valid password',
            'class' : 'error'
        },
        'min' : {
            'error' : 'This field should be at least %1% characters',
            'class' : 'error'
        }
    });


//validator.js
var APP = APP || {};
APP.validator = (function(){
    'use strict';

    var required = function(value) {
        return !(value === undefined || value === null || value.length === 0 || /^\s+$/.test(value));
    };

    var email = function(value) {
        return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(value);
    };

    var password = function(value) {
        var may = /[A-Z]/;
        var min = /[a-z]/;
        var dig = /[0-9]/;

        return (value.length >= 6) && may.test(value) && min.test(value) && dig.test(value);
    };

    var max = function(value, top) {
        return value === undefined || value === null || value.length <= top;
    };

    var min = function(value, bottom) {
        return required(value) && value.length >= bottom;
    };

    return {
        required : required,
        email    : email,
        password : password,
        max      : max,
        min      : min
    };
})();

})(jQuery);
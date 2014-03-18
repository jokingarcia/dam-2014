HTMLFormElement.prototype.validate = function(opts) {
    'use strict';

    var errors = [],
        form   = this,
        inputs = form.querySelectorAll('input[data-validator], textarea[data-validator], select[data-validator]'),
        submit = form.querySelector('input[type="submit"]');

    var DEFAULT_OPTS = {
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

    opts = mergeRecursive(DEFAULT_OPTS, opts);

    var disableSubmit = function() {
        if(submit) {
            submit.value = "Validating...";
            submit.disabled = true;
        }
    };

    var enableSubmit = function() {
        if(submit) {
            submit.value = "Send";
            submit.disabled = false;
        }
    };

    var validateField = function(e) {
        if(APP.validator[this.dataset.validator]) {
            if(!APP.validator[this.dataset.validator](this.value)) {
                console.log(this, opts[this.dataset.validator].error);
                errors.push([this, opts[this.dataset.validator].error]);
            }
        }
    };

    var validateForm = function(e) {
        var ev = new Event('validate');

        errors = [];
        disableSubmit();

        for (var i = inputs.length - 1; i >= 0; i--) {
            inputs[i].dispatchEvent(ev);
        }

        if(errors.length > 0) {
            e.preventDefault();

            enableSubmit();
            console.log(errors);
        }
    };

    form.addEventListener('submit', validateForm);
    for (var i = inputs.length - 1; i >= 0; i--) {
        inputs[i].addEventListener('blur', validateField);
        inputs[i].addEventListener('validate', validateField);
    }

    function mergeRecursive(dst, src) {
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
};
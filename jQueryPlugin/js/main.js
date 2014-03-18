window.$ = Element.prototype.$ = function(selector) {
    var that = (this instanceof Element) ? this : document;
    var elems = that.querySelectorAll(selector);

    return (elems.length === 1) ? elems[0] : elems;
};

window.onload = function() {
    'use strict';

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
};
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

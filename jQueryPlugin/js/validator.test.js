(function(){
    "use strict";

    console.log(APP.validator.required("Arkaitz") === true);
    console.log(APP.validator.required("Garro") === true);
    console.log(APP.validator.required() === false);
    console.log(APP.validator.required(null) === false);
    console.log(APP.validator.required("") === false);
    console.log(APP.validator.required("        ") === false);

    console.log(APP.validator.email("arkaitz.garro@gmail.com") === true);
    console.log(APP.validator.email("arkaitz@gmail.com.es") === true);
    console.log(APP.validator.email("@gmail.com.es") === false);
    console.log(APP.validator.email(".arkaitz@gmail.com.es") === false);
    console.log(APP.validator.email("arkaitz@gmail.com.") === false);

    console.log(APP.validator.password("Ark1234") === true);
    console.log(APP.validator.password("1Ar34kaitz") === true);
    console.log(APP.validator.password("arkaitz") === false);
    console.log(APP.validator.password("1234") === false);
    console.log(APP.validator.password("AAA") === false);

    console.log(APP.validator.max("Loren ipsum", 50) === true);
    console.log(APP.validator.min("Loren ipsum", 50) === false);
    console.log(APP.validator.min("", 50) === false);
})();
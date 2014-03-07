(function(){
    "use strict";
    var meses =["Enero", "Febrero"];
    meses.push("Marzo");
    meses.push("Abril");
    meses.push("Mayo");
    console.log(meses);
    for (var i = meses.length - 1; i >= 0; i--) {
        console.log(meses[i]);
    };

})();
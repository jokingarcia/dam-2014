require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        pouchdb: '../bower_components/pouchdb/dist/pouchdb-nightly',
        'ydn-db': '../bower_components/ydn-db/jsc/ydn.db-dev',
        handlebars : '../bower_components/handlebars.js/dist/handlebars',
        quo: ['https://raw.githubusercontent.com/arkaitzgarro/EarthQuakeLungo/master/js/vendor/quo.debug',
                '../bower_components/quojs/quo'
            ],
        lungo: '../bower_components/lungo/lungo'
    },
    shim: {
        quo:{
            exports: '$$'
        },
        lungo:{
            exports : 'Lungo'
        },
        pouchdb: {
            deps :[
                'quo'
            ],
            exports : 'PouchDB'
        },
        handlebars: {
            exports : 'Handlebars'
        },
        'ydn-db': {
            exports : 'ydn'
        }
    }
});

require(['app'], function () {});//esto inicia toda la aplicación

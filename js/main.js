/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
requirejs.config({

    paths: {
        'domReady': '../lib/requirejs-domready/domReady',
        'angular': '../lib/angular/angular',
        'angularRoute': '../lib/angular-route/angular-route',
        'handlebars': '../lib/handlebars/handlebars',
        'text': '../lib/requirejs-text/text',
        '_': '../lib/lodash/dist/lodash',
        '$': '../lib/jquery/jquery',
        'angular-bootstrap':'../lib/angular-bootstrap/ui-bootstrap',
        'angular-bootstrap-tmpls': '../lib/angular-bootstrap/ui-bootstrap-tpls',
        'firebase': '../lib/firebase/firebase',
        'angular-fire': '../lib/angular-fire/angularfire.min'
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular':{
            exports: 'angular'
        },
        'angularRoute':{
            deps:['angular']
        },
        'handlebars':{
            exports:'Handlebars'
        },
        '_':{
            exports:'_'
        },
        'angular-bootstrap-tmpls':{
            deps: ['angular']
        },
        'angular-bootstrap':{
            deps:['angular', '$', 'angular-bootstrap-tmpls']
        },
        'angular-fire':{
            deps:['angular','firebase']
        }
    },

    deps: [
        // kick start application... see bootstrap.js
        './bootstrap'
    ]
});

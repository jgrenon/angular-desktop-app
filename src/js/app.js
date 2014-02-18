/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define("app", [
    'angular',
    'angular-ui-router',
    'angular-bootstrap',
    'text!',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index',
    './views/index',
    './states/index',
    './models/index'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives',
        'app.views',
        'app.states',
        'app.models',
        'ui.bootstrap',
        "ui.bootstrap.tpls",
        'ui.router'
    ]).run(function($state, nwService, $rootScope) {

        // Create the menubar
        $rootScope.menubar = nwService.createMenu({
            root: {
                type:'menubar',
                items:[
                    {label:'Menu1', items:[
                        {label: 'New...', tooltip: 'Create a new file', click:'new-file'},
                        {label: 'Open...', tooltip: 'Open a file', click:'open-file'},
                        {label: 'Save', tooltip: 'Save a file', click:'save-file'},
                        {label: 'Close', tooltip: 'Close a file', click:'close-file'}
                    ]},
                    {label:'Menu2', items:[
                        {label:'Cut', click:'cut'},
                        {label: 'Copy', click:'copy'},
                        {label: 'Paste', click:'paste'},
                        {type:'separator'},
                        {label:'Find', click:'find'},
                        {label:'Replace', click:'find-replace'}
                    ]}
                ]
            }
        });

        $state.go('home');
    });
});

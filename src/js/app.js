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
    './states/index'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives',
        'app.views',
        'app.states',
        'ui.bootstrap',
        "ui.bootstrap.tpls",
        'ui.router'
    ]).run(function($state) {
        $state.go('home');
    });
});

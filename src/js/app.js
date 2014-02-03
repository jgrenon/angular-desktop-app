/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'angularRoute',
    'angular-bootstrap',
    'angularfire',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index',
    './views/index',
    'text'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives',
        'app.views',
        'ngRoute',
        'ui.bootstrap',
        "ui.bootstrap.tpls",
        "firebase"
    ]).run(function($location) {
        // Go to home view
        $location.path('/home');
    });
});

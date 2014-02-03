/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
    'use strict';

    return app.config(['$routeProvider', 'viewProvider', function ($routeProvider, viewProvider) {

        $routeProvider.when('/signup', {
            template: viewProvider.renderView('signup'),
            controller: 'SignupCtrl'
        });

        $routeProvider.when('/home', {
            template: viewProvider.renderView('home'),
            controller: 'HomeCtrl'
        });

        $routeProvider.otherwise({
            redirectTo: '/home'
        });

    }]);
});

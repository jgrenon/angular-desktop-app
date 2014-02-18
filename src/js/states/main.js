/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./module'], function (states) {
    'use strict';

    return states.config(['$stateProvider', '$urlRouterProvider', 'viewProvider', function ($stateProvider, $urlRouterProvider, viewProvider) {

        $stateProvider.state('signup', {
            url: '/signup',
            template: viewProvider.renderView('signup'),
            controller: 'SignupCtrl'
        });

        $stateProvider.state('home', {
            url:'/home',
            template: viewProvider.renderView('home'),
            controller: 'HomeCtrl'
        });

    }]);
});

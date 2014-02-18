/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./module'], function (states) {
    'use strict';

    var fs = require('fs');

    return states.config(['$stateProvider', '$urlRouterProvider', 'viewProvider', function ($stateProvider, $urlRouterProvider, viewProvider) {

        $stateProvider.state('file_new', {
            url: '/file/new',
            // More details at : https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-open-a-dialogmodal-at-a-certain-state
            onEnter: function($stateParams, $state, $modal) {
                $modal.open({
                    template: viewProvider.renderView('file_new'),
                    controller: 'FileNewCtrl'
                }).result.then(function(result) {
                    if (result) {
                        console.log("File new dialog results is ", result);
                        return $state.go("home");
                    }
                    else {
                        return $state.go("home");
                    }
                });
            }
        });

        $stateProvider.state('file_open', {
            url: '/file/open',
            controller: 'FileOpenCtrl',
            onEnter: function($stateParams, $state, nwService) {
                nwService.openFileDialog({
                    accept: '.js,.xml'
                }).then(function(result) {
                    if(result) {
                        console.log("Resulting file is", result);
                        $state.go('file_view', {path: result});
                    }
                    else
                        $state.go('home');
                }, function(err){
                    console.log("An error occured", err);
                    $state.go('home');
                });
            }
        });

        $stateProvider.state('file_view', {
            url:'/file/view/{path}',
            controller: 'FileViewCtrl',
            template: viewProvider.renderView('file_view'),
            resolve: {
                file: function($stateParams) {
                    console.log("Resolving file", $stateParams.path);
                    return fs.statSync($stateParams.path);
                }
            }
        });

    }]);
});

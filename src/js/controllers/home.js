define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('HomeCtrl', ['$scope', 'securityService', '$location', function ($scope, securityService, $location) {

        securityService.hasValidToken().then(function(hasToken) {
            $scope.authenticated = hasToken;
        });

        securityService.getUserInfos().then(function(user){
            $scope.user = user;
        });

    }]);
});

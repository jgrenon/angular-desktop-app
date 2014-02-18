define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('AppCtrl', ['$scope', 'securityService', 'db', 'Role', '$state', function ($scope, securityService, db, Role, $state) {

        Role.count(function(err, count){

            if(count === 0) {
                console.log("Lazy role initialization...");

                //NOTE: This is for Model usage demonstration only. Roles in your application should not be
                // initialized here
                Role.create({
                    name:'admin',
                    permissions:['ADMIN']
                }, function(err, role){
                    if(err)
                        console.log(err);
                    else
                        console.log("Admin role was successfully created");
                });
            }
            else
                console.log("Detected %d roles already in the database", count);
        });

        securityService.hasValidToken().then(function(hasToken) {
            $scope.authenticated = hasToken;
        });

        securityService.getUserInfos().then(function(user){
            $scope.user = user;
        });

        $scope.$on('new-file', function(e, menu, item) {
            $state.go('file_new');
        });

        $scope.$on('open-file', function(e, menu, item) {
            $state.go('file_open');
        });

    }]);
});

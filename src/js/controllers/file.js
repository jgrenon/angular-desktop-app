define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('FileNewCtrl', ['$scope', '$state', function ($scope, $state) {
        console.log("Loading file new controller");

        $scope.dismiss = function() {
            $scope.$dismiss();
        };

        $scope.create = function() {
            // Perform save action here
            $scope.$close(true);
        };

    }]);

    controllers.controller('FileOpenCtrl', ['$scope', '$state', function ($scope, $state) {
        console.log("Loading file open controller");
    }]);

    controllers.controller('FileViewCtrl', ['$scope', '$state', '$stateParams', 'file', function ($scope, $state, $stateParams, file) {
        console.log("Loading file view controller for file", file);
        $scope.file = file;
        $scope.path = $stateParams.path;
    }]);

});

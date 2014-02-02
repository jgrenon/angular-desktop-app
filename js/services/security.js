define(['./module'], function (services) {
    'use strict';

    services.service('securityService', ['$q', function($q)  {

        this.hasValidToken = function() {
           // Fake authentication - we're always authenticated as we return a promise resolving to (true)
           return $q.when(true);
        };

        this.getUserInfos = function() {
            // Fake user information. Just a promise resolving to a dummy user object
            return $q.when({name: "Guest"});
        };

    }]);
});

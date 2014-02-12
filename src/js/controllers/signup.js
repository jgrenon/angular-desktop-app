define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('SignupCtrl', ['$scope', 'securityService', '$location', 'nwService', function ($scope, securityService, $location, nwService) {

        securityService.hasValidToken().then(function(hasToken) {
            $scope.authenticated = hasToken;
        });

        $scope.authenticate = function() {

            securityService.getRequestToken().then(function(resp) {

                securityService.waitForToken(function(token) {
                    win.close(true);
                    $location.path('/spaces');
                }, function(err) {
                    console.log("Unable to retrieve token:", err);
                });

                // Open the verification URL in an externalBrowser window
                var win = nwService.gui.Window.open("https://api.twitter.com/oauth/authorize?oauth_token="+resp.oauth_token+"&oauth_token_secret="+resp.oauth_token_secret, {
                    position: 'center',
                    width: 600,
                    height: 450,
                    toolbar:false,
                    title:'Vibes.IO - Connect your Twitter account'
                });

            }, function(err) {
                console.dir(err);
            });
        };

    }]);
});

define(['./module'], function (services) {
    'use strict';
    services.factory('db', ['$q', '$timeout', function($q, $timeout) {
        var Datastore = require('nedb');

        function getCollection(name) {
            return new Datastore({
                filename:'./data/'+name+".db",
                autoload:true,
                nodeWebkitAppName:'angular-desktop-app'
            });
        }

        return {
            find:function(coll, q) {
                var defer = $q.defer();
                $timeout(function(){
                    getCollection(coll).find(q || {}, function(err, results) {
                        if(err) defer.reject(err);
                        else {
                            defer.resolve(results);
                        }
                    });
                });
                return defer.promise;
            },
            findOne: function(coll, q) {
                var defer = $q.defer();
                $timeout(function() {
                    getCollection(coll).findOne(q || {}, function(err, result) {
                        if(err) defer.reject(err);
                        else {
                            defer.resolve(result);
                        }
                    });
                });
                return defer.promise;
            },
            update: function(coll, selector, operation, options) {
                var defer = $q.defer();
                $timeout(function() {
                    getCollection(coll).update(selector, operation, options || {}, function(err, numReplaced, upsert) {
                        if(err) defer.reject(err);
                        else {
                            defer.resolve({
                                replaced: numReplaced,
                                upsert:upsert
                            });
                        }
                    });
                });
                return defer.promise;
            }
        }

    }]);
});

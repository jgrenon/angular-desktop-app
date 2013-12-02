define(['./module'], function (services) {
    'use strict';

    services.service('configService', ['$q', function($q)  {

        this.get = function(key, defVal) {
            var _this = this;
            var val = localStorage.getItem(key);
            if(!val && defVal) {
                val = defVal;
                _this.set(key, defVal);
            }
           return $q.when(val);
        };

        this.set = function(key, val) {
            return $q.when(localStorage.setItem(key, val));
        };

    }]);
});

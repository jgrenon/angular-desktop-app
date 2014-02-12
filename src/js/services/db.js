define(['./module'], function (services) {
    'use strict';

    services.factory('db', [function() {

        var tungus = require('tungus');
        var mongoose = require('mongoose');

        console.log("Creating/opening database in folder", process.env.PWD);

        // Establish the database connection
        mongoose.connect('tingodb://'+process.env.PWD+'/data', function (err) {
            // if we failed to connect, abort
            if (err) throw err;
        });

        return mongoose;
    }]);
});

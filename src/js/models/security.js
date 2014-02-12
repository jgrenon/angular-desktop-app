/**
 * Defines the security models for the application
 */

define(['./module'], function (model) {
    'use strict';

    // User Schema
    model.factory('User', function(db) {
        var schema = new db.Schema({
            username:{ type: String, required: true, unique: true, index: true },
            password:{ type: String, required: true },
            email: { type: String},
            first_name:{ type: String },
            last_name: { type: String },
            roles: ['role']
        });

        schema.virtual('name').get(function() {
            return this.first_name + " " + this.last_name;
        });

        // Instantiating the user model instance
        return db.model('user', schema);
    });

    model.factory('Role', function(db){
        var schema = new db.Schema({
            name:{type:String, required: true, index:true},
            permissions:[String]
        });

        // Add model methods here

        return db.model('role', schema);
    });
});

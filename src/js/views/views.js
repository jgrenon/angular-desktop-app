define(['./module', '_'], function (views, _) {
    'use strict';

    var templates = {};

    var jade = require('jade'),
        fs = require('fs'),
        path = require('path');

    fs.readdir(path.resolve('./views'), function(err, files)   {
        console.log("Found %d files", files.length);
        _.each(files, function(f) {
            templates[f.substring(0, f.length - 5)] = {
                tmplfile:fs.readFileSync(path.resolve('./views', f)),
                tmplpath: path.resolve('./views', f),
                compiled:false
            };
        });
    });

    views.provider('view', function() {

        this.renderView = function(name, context, options) {
            return function(params, path) {
                var tmpl = templates[name];

                if(!tmpl.compiled) {
                    console.log("View %s isn't compiled, compiling it now", name);
                    tmpl.tmpl = jade.compile(tmpl.tmplfile, {'filename': tmpl.tmplpath});
                    tmpl.compiled = true;
                }

                return tmpl.tmpl(_.extend(context || {}, {
                    params:params,
                    path:path
                }));
            };
        };

        function ViewRenderer() {

        }

        this.$get = function() {
            return new ViewRenderer();
        };

    });

});

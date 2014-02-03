define(['./module'], function (services) {
    'use strict';

    services.service('nwService', ['$q', function($q)  {

        // Expose gui and main window

        this.gui = require("nw.gui");
        
        this.window = this.gui.Window.get();

    }]);
});



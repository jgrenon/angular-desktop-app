define(['./module', '_'], function (services, _) {
    'use strict';

    services.service('nwService', ['$rootScope', '$q', function($rootScope, $q)  {

        // Expose gui and main window
        var gui = this.gui = require("nw.gui");

        this.window = this.gui.Window.get();

        /**
         * Create a context or window menu.
         * @param menuStructure The actual structure of the menu. This is a shortcut to avoid calling all append methods after creation.
         * Just provide an object with the following supported properties:
         * {
         *  root:{
         *      type: "context|menubar",
         *      items:[{
         *          label: "My Menu Label",
         *          type: "normal|separator|checkbox",
         *          enabled: true|false,
         *          tooltip: "This is my tooltip",
         *          icon: "path-to-icon"
         *          items:[{recursive}]
         *      }]
         *  }
         * }
         * @returns {gui.Menu}
         */
        this.createMenu = function(menuStructure) {

            // Create the top menu
            var menu = new gui.Menu(menuStructure.root);

            // Create sub-menu items if they're provided
            if(menuStructure.root && menuStructure.root.items) {

                console.log("Creating %d menu items for root menu", menuStructure.root.items.length);
                createMenuItems(menu, menuStructure.root.items);
            }

            if(menu.type === 'menubar') {
                this.window.menu = menu;
            }

            return menu;
        };

        /**
         * Open the standard file dialog.
         *
         * @param cfg
         */
        this.openFileDialog = function(cfg) {
            cfg = cfg || {};
            var result = $q.defer();
            var $dlg = $('#fileDialog');
            if(!$dlg) {
                $dlg = $("body").append('<input style="display:none;" id="fileDialog" type="file" />');
            }

            if(cfg.accept) {
                $dlg.attr('accept', cfg.accept);
            }

            $dlg.one('change', function(evt) {
                result.resolve($(this).val());
                evt.preventDefault();
            });
            $dlg.one('cancel', function(evt) {
                console.log("Cancel was called");
                evt.preventDefault();
                result.resolve(false);
            });
            $dlg.one('close', function(evt) {
                console.log("Close was called");
                evt.preventDefault();
                result.resolve(false);
            });
            $dlg.trigger('click');
            return result.promise;
        };

        function createMenuItems(menu, items) {

            _.each(items, function(i) {

                console.log("Creating item", i.label);

                // Shortcut to integrate menu with Angular event system when click represents an eventName
                if(_.isString(i.click)) {
                    i.click = (function(menu, $rootScope, eventName) { return function() { $rootScope.$broadcast(eventName, menu, this) } })(menu, $rootScope, i.click);
                }

                // Create a sub-menu if items are provided
                if(i.items) {
                    i.submenu = new gui.Menu();
                    createMenuItems(i.submenu, i.items);
                }

                // Append the menu item to the provided menu
                console.log("appending item %s to menu", i.label);
                menu.append(new gui.MenuItem(i));
            });

        }
    }]);

});


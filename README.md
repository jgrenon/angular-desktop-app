# Angular Desktop App

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jgrenon/angular-desktop-app/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

This is a simple application skeleton to create desktop application using AngularJS. This application is using node-webkit as our desktop host,
bower to install client-side libraries as well as normal npm modules as supported by node-webkit.

This is a work in progress and there are currently no test available yet. More features will be added as I have time available.

Everything is dynamically loaded through require.js, to ensure that all Angular components are kept separated in separate folders.

# Release Notes

- [1.2.0 - 2014-02-18]:
    + Add menubar support with seamless integration into the Angular event system.
    + Add file open dialog support in nwService with promise returning the selected file path
    + migrate to node-webkit 0.9.1
- [1.1.0 - 2014-02-12]:
    + Migrate project to angular-ui-router, which is much more aligned with managing complex UI state, which is required for rich desktop app. New modular way
        to declare states (routes) following the exact same pattern we use for other angular modules. See navigation documentation for more details.
    + Integrated Grunt in the project (thanks to [Tom Lawton](https://github.com/talss89) )


## Getting Started

- 1. Get the source code

You can either fork this repository and clone it to your local disk or use git branches to integrate this seed with another git repository. The later will
help you get any bug fixes and improvements we put in the seed.

    $ git remote add seed git@github.com:jgrenon/angular-desktop-app.git
    $ git fetch seed
    $ git checkout -b seed seed/master

You can push a copy of the seed to your origin

    $ git push origin seed

Merge `seed` to `master` branch:

    $ git checkout master
    $ git merge seed

  Resolve merge conflicts then push to `origin/master`:

    $ git push

- 2. In the application root, execute **npm install && grunt install**. Node-Webkit will be installed locally under ```cache/<platform>/<version>```.
- 3. To run your application, execute **grunt run**.


## More Details

The application is launch and index.html is loaded. Grunt uses LESS to render all stylesheets. The default stylesheet is located in
./css/app.less and includes bootstrap 3.0. No need to add bootstrap, you just get all bootstrap controls, grid and features. We're declaring the ng-view element which will act as a placeholder
for Angular views. After that, we bootstrap require.js by loading the  js/main.js file. No other JS files are loaded statically. Everything else is loaded through require.js as described
in main.js

main.js contains standard require.js configuration entries. We define all libraries that are declared in bower.json in the paths section. We delare a few shims to add require.js support to
non-compatible libraries. We also define dependencies to help require.js load all libraries in the right order. This reduces also the number of dependencies you have to state in your own
modules. The control is then passed to the bootstrap module, which will launch the angular application and start loading all application specific modules. The bootstrap load angular an
Angular application called **app***, which is defined in ./js/app.js.

app.js is a standard Angular 1.2 application, loading all dependent modules to get services, controllers, etc.

Each Angular component is defined in its own file and dynamically injected when you need it using require.js. The same pattern is used for all components, an index.js file, loaded by require.js,
declares all component files. This ensures that all files are loaded automatically. Each Angular component file is a require.js module, which declares the actual Angular component.

## Navigation

Application navigation is powered by the angular-ui-router module. This module manages hierarchical ui state and offer a very powerful way to structure complex ui. For example, we now support
nested views and multi views (multiple ui-view placeholder in the application). This is much more aligned with common desktop app needs.

### Declaring a new state
A state is a particular location in the application UI. We have grouped all routes into the app.states module (js/states/main.js). The main file contains top-level states that can be referenced
from anywhere in controllers by using `$state.go('signup')`. You can added more top-level states in this file or create additional files (dialogs.js, security.js) to group new state together. Just
remember to add your file to the dependency list of the index.js file. Follow the main.js structure and your new state will be available in your application.

## Menus

Menubar and contextual menus are now supported directly in the nwService. The benefits of using the service are :

- Capacity to create a full menu structure in a single call (see node-webkit.js service)
- Integration with Angular by providing an event name as 'click' value. When the user click the menu, the $rootScope will $broadcast your event name, so it's easy for
you to register $on(eventName) handlers in any of your scope. You should register your handlers in the AppCtrl for the menubar and directly in your local controller for contextual menus.

## Packaging

To package your application, simply run **grunt build** from the application root.

Check ```releases/<platform>``` for the finished product.

**Known Issue** - Decompressing the executable takes time, sometimes large programs may be slow to start.

## Next Steps

Feel free to contribute pull requests to improve this frame. Adding grunt to launch the app would be nice, adding Jasmine tests, exposing various Node-webkit features as Angular services
would also be nice. I'll contribute a few myself as I continue the implementation of my own app for my Vibes.IO cloud platform.

DONE - Add better database abstraction for model objects
DONE - Expose node-webkit menubar as Angular service
DONE - Provide navigation and layout samples to show the power of angular-ui-router for desktop app (nested and multi views)
- Add all tests
- Integrate Server Side communication pattern (through Angular service, socket.io?)
- Expose node-webkit notification area
- Integrate our User/Role model with the security service
- Add a data bootstrap mechanism to create structural data on first load
- Add socket.io support for real-time communication

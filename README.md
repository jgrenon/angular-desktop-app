# Angular Desktop App

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jgrenon/angular-desktop-app/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

This is a simple application skeleton to create desktop application using AngularJS. This application is using node-webkit as our desktop host,
bower to install client-side libraries as well as normal npm modules as supported by node-webkit.

This is a work in progress and there are currently no test available yet. More features will be added as I have time available.

Everything is dynamically loaded through require.js, to ensure that all Angular components are kept separated in separate folders.

## Getting Started

1. Fork this repository and clone it to your local disk.
2. In the application root, execute **npm install && grunt install**. Node-Webkit will be installed locally under ```cache/<platform>/<version>```.
3. To run your application, execute **grunt run**. 


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

Navigation in a desktop application is different from a web app. The navigation is performed by Angular and all available routes are declared in ./js/routes.js. We have to specify the
controller and the actual view in each route. Views are created using Jade and contained in the ./views folder. We've created an hybrid Angular service, which use the node.js capabilities or
node-webkit, to render Jade templates when requested. For now, this is very basic, but this could be enhanced to support better caching, parameters, etc. Have a look at the viewProvider service
to get a feel of how we render Jade views in the node-webkit app.

## Packaging

To package your application, simply run **grunt build** from the application root.

Check ```releases/<platform>``` for the finished product.

**Known Issue** - Decompressing the executable takes time, sometimes large programs may be slow to start.

## Next Steps

Feel free to contribute pull requests to improve this frame. Adding grunt to launch the app would be nice, adding Jasmine tests, exposing various Node-webkit features as Angular services
would also be nice. I'll contribute a few myself as I continue the implementation of my own app for my Vibes.IO cloud platform.

- Add Jasmine Tests
- Integrate Server Side communication pattern (through Angular service, socket.io?)
- Add better database abstraction for model objects
- Expose node-webkit menubar as Angular service
- Expose node-webkit notification area


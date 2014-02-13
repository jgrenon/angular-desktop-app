var exec = require('child_process').exec;

console.log("Rebuilding some modules...");

exec("nw-gyp clean && nw-gyp configure --target=0.8.4 && nw-gyp build", {
    cwd:'./node_modules/mongoose/node_modules/mongodb/node_modules/bson'
}, function(err, stdout, stderr) {
    if(err) {
        console.error(err);
        console.error(stderr);
    }
    else {
        console.log("Post install successfully executed");
    }
});

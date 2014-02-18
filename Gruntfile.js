var isWin = /^win/.test(process.platform);
var isMac = /^darwin/.test(process.platform);
var isLinux32 = /^linux/.test(process.platform);
var isLinux64 = /^linux64/.test(process.platform);

var os = "unknown";

if (isWin)
    os = "win";
if (isMac)
    os = "mac";
if (isLinux32)
    os = "linux32";
if (isLinux64)
    os = "linux64";

var nwVer = '0.9.1';

var nwExec = "";

if (!isMac)
    nwExec = "cd cache/" + os + "/" + nwVer + " && nw ../../../src";
else
    nwExec = "cd cache/" + os + "/" + nwVer + " && open -n -a node-webkit ../../../src";


console.log("OS: " + os);

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        less: {
            './src/css/app.css': ['./src/css/app.less']
        },
        nodewebkit: {
            options: {
                version: nwVer,
                build_dir: './',
                mac: isMac,
                win: isWin,
                linux32: isLinux32,
                linux64: isLinux64,
                keep_nw: false,
                zip: false,
                mac_icns:'./src/images/angular-desktop-app.icns'
            },
            src: ['./src/**/*']
        },
        clean: ["./releases/**/*"],
        shell: {
            install: {
                command: function() {
                    return 'bower cache clean && bower install && cd src && npm install';
                },
                options: {
                    stdout: true,
                    stderr: true,
                    stdin: true
                }
            },
            run: {
                command: function() {
                    return nwExec;
                },
                options: {
                    stdout: true,
                    stderr: true,
                    stdin: true
                }

            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['less', 'shell:run']);
    grunt.registerTask('run', ['default']);
    grunt.registerTask('install', ['shell:install', 'nodewebkit']);
    grunt.registerTask('build', ['less', 'nodewebkit']);


};
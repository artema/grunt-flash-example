'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        compc: {
            //Default options for each compc task can be defined here
            options: {
                'warnings': false
            },
            compc: {
                src: ['flash/lib/src/**/*.as', 'lib/src/**/*.mxml'],
                dest: 'flash/lib/bin/example-lib.swc',
                //All options are decorated with a leading dash (-) and have their value added after the '=',
                //with an exception of options that has an undefined as their value,
                //which are passed as-is and with no value attached to them. It can be useful in some
                //cases, such as with the compiler-time constants declaration.
                options: {
                    'source-path': ['flash/lib/src/'],
                    'define=CONFIG::DEBUG,true': undefined
                }
            }
        },

        mxmlc: {
            options: {
                rawConfig: '-library-path+=flash/lib/bin' //Complete mxmlc command line input goes here
            },
            mxmlc: {
                files: {
                    //It is possible to build multiple apps at once
                    'flash/app/bin-release/app.swf': ['flash/app/src/**/*.as', 'flash/app/src/**/*.mxml']
                }
            }
        },
        
        clean: {
            options: {
                force: true  
            },
            binaries: ['flash/lib/bin/*.*', 'flash/app/bin-debug/*.*', 'flash/app/bin-release/*.*'],
        }
    });

    grunt.loadNpmTasks('grunt-mxmlc');
    grunt.loadNpmTasks('grunt-compc');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('test', ['clean', 'compc', 'mxmlc', 'clean']);

    grunt.registerTask('default', ['clean', 'compc', 'mxmlc']);
};
'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        compc: {
            options: {
            },
            compc: {
                src: ['flash/lib/src/**/*.as', 'lib/src/**/*.mxml'],
                dest: 'flash/lib/bin/example-lib.swc',
                options: {
                    'source-path': ['flash/lib/src/'] 
                }
            }
        },

        mxmlc: {
            options: {
                rawConfig: '-library-path+=flash/lib/bin'
            },
            mxmlc: {
                files: {
                    'flash/app/bin-release/app.swf': ['flash/app/src/**/*.as', 'flash/app/src/**/*.mxml']
                }
            }
        },
        
        clean: {
            options: {
                force: true  
            },
            compc: ['flash/lib/bin/*.*', 'flash/app/bin-debug/*.*', 'flash/app/bin-release/*.*'],
        }
    });

    grunt.loadNpmTasks('grunt-mxmlc');
    grunt.loadNpmTasks('grunt-compc');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('test', ['clean', 'compc', 'mxmlc', 'clean']);

    grunt.registerTask('default', ['test']);
};
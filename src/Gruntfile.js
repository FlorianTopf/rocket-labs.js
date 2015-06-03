module.exports = function(grunt) {
    var typeScriptPath = '02_typescript/';
    var scScriptsPaths = typeScriptPath + 'sc_scripts/';

    grunt.initConfig({
        clean: {
            ts: [typeScriptPath + '**/*.js', typeScriptPath + '**/*.map']
        },
        ts: {
            default: {
                src: [typeScriptPath + '*/*.ts', '!' + scScriptsPaths + '**/*.ts'],
                options: {
                    sourceMap: false
                }
            },
            scScripts: {
                src: scScriptsPaths + '**/*.ts',
                options: {
                    sourceMap: false,
                    fast: 'never'
                },
                out: scScriptsPaths + 'app.js'
            }
        },
        watch: {
            grunt: {
                files: 'Gruntfile.js',
                tasks: 'default'
            },
            ts: {
                files: typeScriptPath + '**/*.ts',
                tasks: 'ts',
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-continue');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask(
        'default',
        [
            'clean',
            'continue:on',
            'ts',
            'continue:off',
            'watch'
        ]
    );
};

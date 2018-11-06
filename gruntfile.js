module.exports = function(grunt){

	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	//lancement de toutes les tâches sans avoir à les lister
    require('load-grunt-tasks')(grunt);

	//création des têches
	grunt.initConfig({	//initialisation de l'ensemble des tâches
    sass: {                              // Task
        dev: {                            // Target
            files: {                         // Dictionary of files
                'dev/style.css': 'dev/sass/style.scss'
            },
            options: {
                update: true,
                sourcemap: 'auto'

            }
        },
        docs: {
            files: {
                'docs/style.css': 'dev/sass/style.scss'
            },
            options: {
                update: true,
                sourcemap: 'none',
                style:'nested'

            }
        }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            cwd:'dev',
            src: ['index.html','src/*'],
            dest: 'docs/',
            filter: 'isFile'
          },
        ],
      },
    },
    autoprefixer: {
      docs :{
          files: {
              // Target-specific file lists and/or options go here.
              'docs/style.css':'dev/style.css',
          }
      }
    },
    uglify: {
      dev: {
        files: {
          'dev/app.js': [
            'dev/js/test1.js',
            'dev/js/test2.js'
          ]
        }
      },
      docs: {
        files: {
          'docs/app.js': [
            'dev/js/test1.js',
            'dev/js/test2.js'
          ]
        }
      }
    },
    jekyll: {                             // Task
      options: {                          // Universal options
        bundleExec: true,
        src : '<%= app %>'
      },
      dist: {                             // Target
        options: {                        // Target options
          dest: '<%= dist %>',
          config: '_config.yml,_config.build.yml'
        }
      },
      serve: {                            // Another target
        options: {
          serve: true,
          dest: '.jekyll',
          drafts: true,
          future: true
        }
      }
    }

    watch: {
       options: {
  		        livereload: true,
      },
        html: {
            files: ['**/*.html']
        },
        sass: {
            files: ['dev/sass/**/*.scss'],
            tasks: ['sass:dev'],
            options: { spawn: false }
        },
        js: {
          files: ['dev/js/**/*.js'],
          task: ['uglify:dev']
        },
        grunt: {
            files: ['gruntfile.js'],
        }
    }

	});

	//lanceur de tâche
	grunt.registerTask('default', ['sass:dev','uglify:dev','watch']);
  grunt.registerTask('deploy', ['sass:docs','autoprefixer','uglify:docs','copy']);




};

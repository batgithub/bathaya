module.exports = function(grunt){

	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

	//création des tâches
	grunt.initConfig({	//initialisation de l'ensemble des tâches
    //////////////////
    // SASS
    //////////////////
    sass: {
        serve: {
            files: {
                './assets/main.css': './sass/theme.scss'
            },
            options: {
                update: true,
                sourcemap: 'auto'

            }
        }
    },
    //////////////////
    // END SASS
    //////////////////


    //////////////////
    // COPY
    //////////////////
    copy: {
      main: {
        files: [
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
    //////////////////
    // END COPY
    //////////////////


    //////////////////
    // AUTOPREFIXER
    //////////////////
    autoprefixer: {
      serve :{
          files: {
              // Target-specific file lists and/or options go here.
              './assets/main-prefix.css':'./assets/main.css',
          }
      }
    },
    //////////////////
    // END AUTOPREFIXER
    //////////////////


    //////////////////
    // UGLIFY
    //////////////////
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
    //////////////////
    // END UGLIFY
    //////////////////


    //////////////////
    // JEKYLL
    //////////////////
    jekyll: {
      options: {
        bundleExec: true,
        src : './'
      },
      dist: {
        options: {
          dest: './_site',
          // config: '_config.yml,_config.build.yml'
        }
      },
      serve: {
        options: {
          serve: true,
          dest: './_site',
          drafts: false,
          future: true,
          livereload: true
        }
      }
    },
    //////////////////
    // END JEKYLL
    //////////////////


    //////////////////
    // WATCH
    //////////////////
    watch: {
      options: {
  		  livereload: true,
      },
      html: {
        files: ['**/*.html']
      },
      sass: {
        files: ['./sass/**/*.scss'],
        tasks: ['sass:serve','autoprefixer:serve','jekyll:dist'],
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
    //////////////////
    // END WATCH
    //////////////////

	});

	//lanceur de tâche
	grunt.registerTask('default', ['sass:dev','uglify:dev','watch']);
  grunt.registerTask('deploy', ['sass:docs','autoprefixer','uglify:docs','copy']);
  grunt.registerTask('test', ['sass:serve','autoprefixer:serve','jekyll:dist','watch']);




};

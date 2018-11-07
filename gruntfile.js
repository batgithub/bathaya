module.exports = function(grunt){

	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);


  var log = function (err, stdout, stderr, cb) {
        if(stdout) {
            grunt.log.writeln(stdout);
        }
        if(stderr) {
            grunt.log.error(stderr);
        }
        cb();
  };
  const sass = require('node-sass');


	//création des tâches
	grunt.initConfig({
    //////////////////
    // SASS
    //////////////////
    sass: {
      serve: {
        files: {
            './assets/main.css': './_sass/theme.scss'
        },
        options: {
            sourcemap: 'auto',
            implementation: sass,

        }
      }
    },
    //////////////////
    // END SASS
    //////////////////


    //////////////////
    // SHELL
    //////////////////
    shell: {
      jekyllBuild: {
        command: 'jekyll build JEKYLL_ENV=dev'
      },
      jekyllServe: {
        command: 'bundle exec jekyll serve',
        options: {
          callback: log
        }
      }
    },
    //////////////////
    // END SHELL
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
    // WATCH
    //////////////////
    watch: {
      options: {
  		  livereload: true,
      },
      html: {
        files: ['_include/*.html','_layout/*.html'],
        tasks: ['shell:jekyllBuild']
      },
      sass: {
        files: ['./_sass/**/*.scss'],
        tasks: ['sass:serve','autoprefixer:serve','shell:jekyllBuild'],
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

  grunt.registerTask('default', ['shell:jekyllBuild',  'watch']);




};

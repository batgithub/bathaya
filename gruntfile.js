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
      },
      build: {
        files: {
            './assets/main.css': './_sass/theme.scss'
        },
        options: {
            sourcemap: 'undefined',
            implementation: sass,
            outputStyle: 'compressed'

        }
      }
    },
    //////////////////
    // END SASS
    //////////////////

    //////////////////
    // AUTOPREFIXER
    //////////////////
    autoprefixer: {
      build :{
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
      serve: {
        files: {
          'dev/app.js': [
            'dev/js/test1.js',
            'dev/js/test2.js'
          ]
        }
      },
      build: {
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
    // SHELL
    //////////////////
    shell: {
      jekyllBuild: {
        command: 'JEKYLL_ENV=production jekyll build'
      },
      jekyllServe: {
        command: 'JEKYLL_ENV=development jekyll build --drafts',
        options: {
          callback: log
        }
      }
    },
    //////////////////
    // END SHELL
    //////////////////


    //////////////////
    // WATCH
    //////////////////
    watch: {
      options: {
  		  livereload: true,
      },
      base: {
        files: ['./_config.yml','./about.md'],
        tasks: ['shell:jekyllServe']
      },
      html: {
        files: ['404.html','./_includes/**/*.html','./_layouts/**/*.html','./_drafts/**/*md','./_posts/**/*.md'],
        tasks: ['shell:jekyllServe']
      },
      sass: {
        files: ['./_sass/**/*.scss'],
        tasks: ['sass:serve','shell:jekyllServe'],
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

  grunt.registerTask('default', ['shell:jekyllServe',  'watch']);
  grunt.registerTask('build', ['sass:build','autoprefixer:build','shell:jekyllBuild']);




};

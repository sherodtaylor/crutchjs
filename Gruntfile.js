module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'lib/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      src: 'lib/<%= pkg.name %>.js',
      options: {
        vendor: 'tests/vendor/underscore-min.js',
        specs: ['tests/specs/events.js','tests/specs/model.js'],
        version: '1.3.1'
      }
    },
    jshint: {
      src:['lib/<%= pkg.name %>.js', 'tests/specs/events.js','tests/specs/model.js'],
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['jshint','jasmine','uglify']);

  // // Travis CI task.
  grunt.registerTask('travis', ['jshint','jasmine']);
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      src: 'lib/<%= pkg.name %>.js',
      options: {
        vendor: 'tests/vendor/underscore-min.js',
        specs: 'tests/specs/events.js',
        version: '1.3.1'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['jasmine','uglify']);
  grunt.registerTask('travis', ['jasmine']);

  // // Travis CI task.
};

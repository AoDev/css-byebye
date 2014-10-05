/*
* css-byebye
* https://github.com/AoDev/css-byebye
*
* Author Kevin Purnelle <kevin.purnelle@gmail.com>
* Licensed under the MIT license.
*/

'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    mochaTest: {
      all: {
        options: { reporter: 'spec' },
        src: ['test/spec.js']
      }
    }
  })

  require('load-grunt-tasks')(grunt)
  grunt.registerTask('test', ['mochaTest'])
  grunt.registerTask('default', ['test'])
}

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

    // Bump version option
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },

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

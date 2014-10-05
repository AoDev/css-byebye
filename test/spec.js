
var assert = require('assert')
var cssbyebye = require('../lib/css-byebye')
var fs = require('fs')


describe('cssbyebye', function () {

  it('should remove ruleset(s) with a selector that contains any of the given selectors to remove ', function (done) {

    var css = 'a { font-size: 12px; } .hello .h1 { background: red } .world { color: blue }'
    var rulesToRemove = ['.hello', '.world']
    var expected = 'a { font-size: 12px; }'
    var result = cssbyebye.process(css, { rulesToRemove: rulesToRemove, map: false })

    assert.strictEqual(result.css, expected)
    done()
  })

  it('should remove only the matching selector(s) from a group of selectors', function (done) {

    var css = '.hello .world, .title, #id { color: red }'
    var rulesToRemove = ['.world']
    var expected = ' .title, #id { color: red }'
    var result = cssbyebye.process(css, { rulesToRemove: rulesToRemove, map: false })

    assert.strictEqual(result.css, expected)
    done()
  })
})



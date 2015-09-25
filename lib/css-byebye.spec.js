
var assert = require('assert')
var cssbyebye = require('../lib/css-byebye')
var postcss = require('postcss')

describe('cssbyebye', function () {
  it('should remove ruleset(s) that matches any given selectors to remove ', function (done) {
    var css = 'a { font-size: 12px; } .hello .h1 { background: red } .world { color: blue }'
    var rulesToRemove = ['.hello .h1', '.world']
    var expected = 'a { font-size: 12px; }'
    var options = { rulesToRemove: rulesToRemove, map: false }
    var result = postcss(cssbyebye(options)).process(css)

    assert.strictEqual(result.css, expected)
    done()
  })

  it('should remove only the matching selector(s) from a group of selectors', function (done) {
    var css = '.hello .world, .title, #id { color: red }'
    var rulesToRemove = ['.hello .world']
    var expected = '.title, #id { color: red }'
    var options = { rulesToRemove: rulesToRemove, map: false }
    var result = postcss(cssbyebye(options)).process(css)

    assert.strictEqual(result.css, expected)
    done()
  })

  it('should support regex matching', function (done) {
    var css = '.item {} .item .desc { background: red } .list .item {}'
    var rulesToRemove = [/^\.item/]
    var expected = '.list .item {}'
    var options = { rulesToRemove: rulesToRemove, map: false }
    var result = postcss(cssbyebye(options)).process(css)

    assert.strictEqual(result.css, expected)
    done()
  })
})

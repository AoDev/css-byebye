var assert = require('assert')
var cssbyebye = require('../lib/css-byebye')
var postcss = require('postcss')

describe('cssbyebye', function () {
  it('should remove ruleset(s) that matches any given selectors to remove ', function () {
    var css = 'a { font-size: 12px; } .hello .h1 { background: red } .world { color: blue }'
    var rulesToRemove = ['.hello .h1', '.world']
    var expected = 'a { font-size: 12px; }'
    var options = { rulesToRemove: rulesToRemove, map: false }
    var result = postcss(cssbyebye(options)).process(css)

    assert.strictEqual(result.css, expected)
  })

  it('should remove only the matching selector(s) from a group of selectors', function () {
    var css = '.hello .world, .title, #id { color: red }'
    var rulesToRemove = ['.hello .world']
    var expected = '.title, #id { color: red }'
    var options = { rulesToRemove: rulesToRemove, map: false }
    var result = postcss(cssbyebye(options)).process(css)

    assert.strictEqual(result.css, expected)
  })

  it('should support regex matching', function () {
    var css = '.item {} .item .desc { background: red } .list .item {}'
    var rulesToRemove = [/^\.item/]
    var expected = '.list .item {}'
    var options = { rulesToRemove: rulesToRemove, map: false }
    var result = postcss(cssbyebye(options)).process(css)

    assert.strictEqual(result.css, expected)
  })

  describe('regex metacharacters in input strings', function () {
    it('should handle "-" metacharacter properly', function () {
      var css = '.item-with-dash {} #other {}'
      var rulesToRemove = ['.item-with-dash']
      var expected = '#other {}'
      var options = { rulesToRemove: rulesToRemove, map: false }
      var result = postcss(cssbyebye(options)).process(css)

      assert.strictEqual(result.css, expected)
    })

    it('should not choke on other metacharacters (although not valid CSS)', function () {
      var css = '.item-with-dash {} #other {}'
      var rulesToRemove = ['.item-with-dash', '-[]/{}()*+?.\\^$|']
      var expected = '#other {}'
      var options = { rulesToRemove: rulesToRemove, map: false }
      var result = postcss(cssbyebye(options)).process(css)

      assert.strictEqual(result.css, expected)
    })
  })

  it('should remove at-rules', function () {
    var css = '@charset "UTF-8"; @font-face { font-family: "Font Name" } #id { color: red }'
    var rulesToRemove = ['@charset', '@font-face']
    var expected = '#id { color: red }'
    var options = { rulesToRemove: rulesToRemove, map: false }
    var result = postcss(cssbyebye(options)).process(css)

    assert.strictEqual(result.css, expected)
  })
})

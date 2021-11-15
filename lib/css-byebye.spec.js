const assert = require('assert')
const cssbyebye = require('../lib/css-byebye')
const postcss = require('postcss')

describe('cssbyebye', function () {
  it('should remove ruleset(s) that matches any given selectors to remove ', function () {
    const css = 'a { font-size: 12px; } .hello .h1 { background: red } .world { color: blue }'
    const rulesToRemove = ['.hello .h1', '.world']
    const expected = 'a { font-size: 12px; }'
    const options = {rulesToRemove: rulesToRemove, map: false}
    const result = postcss(cssbyebye(options)).process(css)

    assert.strictEqual(result.css, expected)
  })

  it('should remove only the matching selector(s) from a group of selectors', function () {
    const css = '.hello .world, .title, #id { color: red }'
    const rulesToRemove = ['.hello .world']
    const expected = '.title, #id { color: red }'
    const options = {rulesToRemove: rulesToRemove, map: false}
    const result = postcss(cssbyebye(options)).process(css)

    assert.strictEqual(result.css, expected)
  })

  it('should support regex matching', function () {
    const css = '.item {} .item .desc { background: red } .list .item {}'
    const rulesToRemove = [/^\.item/]
    const expected = '.list .item {}'
    const options = {rulesToRemove: rulesToRemove, map: false}
    const result = postcss(cssbyebye(options)).process(css)

    assert.strictEqual(result.css, expected)
  })

  describe('regex metacharacters in input strings', function () {
    it('should handle "-" metacharacter properly', function () {
      const css = '.item-with-dash {} #other {}'
      const rulesToRemove = ['.item-with-dash']
      const expected = '#other {}'
      const options = {rulesToRemove: rulesToRemove, map: false}
      const result = postcss(cssbyebye(options)).process(css)

      assert.strictEqual(result.css, expected)
    })

    it('should not choke on other metacharacters (although not valid CSS)', function () {
      const css = '.item-with-dash {} #other {}'
      const rulesToRemove = ['.item-with-dash', '-[]/{}()*+?.\\^$|']
      const expected = '#other {}'
      const options = {rulesToRemove: rulesToRemove, map: false}
      const result = postcss(cssbyebye(options)).process(css)

      assert.strictEqual(result.css, expected)
    })
  })

  it('should remove at-rules', function () {
    const css = '@charset "UTF-8"; @font-face { font-family: "Font Name" } #id { color: red }'
    const rulesToRemove = ['@charset', '@font-face']
    const expected = '#id { color: red }'
    const options = {rulesToRemove: rulesToRemove, map: false}
    const result = postcss(cssbyebye(options)).process(css)

    assert.strictEqual(result.css, expected)
  })

  it('should ignore rules preceded by a directive ignore', function () {
    const css = 'a { font-size: 12px; } /* byebye:ignore */ .hello .h1 { background: red } .hello .h1 { text-align: left } .world { color: blue }'
    const rulesToRemove = ['.hello .h1', '.world']
    const expected = 'a { font-size: 12px; } .hello .h1 { background: red }'
    const options = {rulesToRemove: rulesToRemove, map: false}
    const result = postcss(cssbyebye(options)).process(css)
    assert.strictEqual(result.css, expected)
  })

  it('should ignore block of rules with directive ignore:start and ignore:end', function () {
    const css = 'a { font-size: 12px; } /* byebye:begin:ignore */ .hello .h1 { background: red } .hello .h1 { text-align: left } .world { color: blue } /* byebye:end:ignore */ .world { font-size: 10px; }'
    const rulesToRemove = ['.hello .h1', '.world']
    const expected = 'a { font-size: 12px; } .hello .h1 { background: red } .hello .h1 { text-align: left } .world { color: blue }'
    const options = {rulesToRemove: rulesToRemove, map: false}
    const result = postcss(cssbyebye(options)).process(css)
    assert.strictEqual(result.css, expected)
  })
})

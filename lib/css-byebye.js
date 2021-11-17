/**
 * @module css-byebye
 */

const postcss = require('postcss')
const {
  CONTROL_DIRECTIVES,
  CONTROL_DIRECTIVES_BLOCKS,
  getControlDirective,
} = require('./utilities/directives')
const {regexize, concatRegexes} = require('./utilities/regexps')

/**
 * Return the actual postcss plugin to remove rules from the css
 */
const cssbyebye = postcss.plugin('css-byebye', function (options) {
  return function byebye(css) {
    const remregexes = regexize(options.rulesToRemove)
    const regex = concatRegexes(remregexes)
    let controlDirective = null

    css.walk(walkNodes)

    function walkNodes(node) {
      if (node.type === 'comment') {
        const cd = filterComments(node)
        if (cd) {
          controlDirective = cd.block === CONTROL_DIRECTIVES_BLOCKS.END ? null : cd
        }
        return
      }

      // ignore directive
      if (controlDirective && controlDirective.directive === CONTROL_DIRECTIVES.IGNORE) {
        if (typeof controlDirective.block === 'undefined') {
          controlDirective = null
        }
        return
      }

      if (node.type === 'rule') {
        filterRule(node)
      } else if (node.type === 'atrule') {
        filterAtRule(node)
      }
    }

    function filterComments(comment) {
      const cd = getControlDirective(comment)
      if (cd) {
        comment.remove()
        return cd
      }
      return null
    }

    function filterRule(rule) {
      const selectors = rule.selectors
      const filtered = []

      for (let j = 0, len = selectors.length; j < len; j++) {
        if (selectors[j].match(regex) === null) {
          filtered.push(selectors[j])
        }
      }

      if (filtered.length > 1) {
        rule.selector = filtered.join(', ')
      } else if (filtered.length === 1) {
        rule.selector = filtered[0].trim()
      } else {
        rule.remove()
      }
    }

    function filterAtRule(rule) {
      const ruleName = '@' + rule.name

      if (ruleName.match(regex) !== null) {
        rule.remove()
      }
    }
  }
})

module.exports = cssbyebye

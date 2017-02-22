/**
 * @module css-byebye
 */

var postcss = require('postcss')

/**
 * Escape a string so that it can be turned into a regex
 * @param  {String} str String to transform
 * @return {String}     Escaped string
 */
function escapeRegExp (str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
}

/**
 * Turn strings from rules to remove into a regexp to concat them later
 * @param  {Mixed Array} rulesToRemove
 * @return {RegExp Array}
 */
function regexize (rulesToRemove) {
  var rulesRegexes = []
  for (var i = 0, l = rulesToRemove.length; i < l; i++) {
    if (typeof rulesToRemove[i] === 'string') {
      rulesRegexes.push(new RegExp('^\\s*' + escapeRegExp(rulesToRemove[i]) + '\\s*$'))
    } else {
      rulesRegexes.push(rulesToRemove[i])
    }
  }
  return rulesRegexes
}

/**
 * Concat various regular expressions into one
 * @param  {RegExp Array} regexes
 * @return {RegExp}       concatanated regexp
 */
function concatRegexes (regexes) {
  var rconcat = ''

  if (Array.isArray(regexes)) {
    for (var i = 0, l = regexes.length; i < l; i++) {
      rconcat += regexes[i].source + '|'
    }

    rconcat = rconcat.substr(0, rconcat.length - 1)

    return new RegExp(rconcat)
  }
}

/**
 * Return the actual postcss plugin to remove rules from the css
 */
var cssbyebye = postcss.plugin('css-byebye', function (options) {
  return function byebye (css) {
    var remregexes = regexize(options.rulesToRemove)
    var regex = concatRegexes(remregexes)

    css.walkRules(filterRule)

    function filterRule (rule) {
      var selectors = rule.selectors
      var filtered = []

      for (var j = 0, len = selectors.length; j < len; j++) {
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

    css.walkAtRules(filterAtRule)

    function filterAtRule (rule) {
      var ruleName = '@' + rule.name

      if (ruleName.match(regex) !== null) {
        rule.remove()
      }
    }
  }
})

module.exports = cssbyebye

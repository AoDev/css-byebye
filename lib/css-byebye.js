

var postcss = require('postcss')

var cssbyebye = postcss(function (css, options) {

  var rem = options.rulesToRemove
  var l = options.rulesToRemove.length

  var filterRule = function filterRule(rule) {

    var selectors = null
    var filtered = null

    for (var i = 0; i < l; i++) {

      if (rule.selector.indexOf(rem[i]) > -1) {

        selectors = rule.selector.split(',')
        filtered = []

        for (var j = 0; j < selectors.length; j++) {
          if (selectors[j].indexOf(rem[i]) == -1)
            filtered.push(selectors[j])
        }

        if (filtered.length > 1)
          rule.selector = filtered.join(',')
        else if (filtered.length == 1)
          rule.selector = filtered[0].trim()
        else {
          rule.removeSelf()
          break
        }
      }
    }
  }

  css.eachRule(filterRule)
})


module.exports = cssbyebye

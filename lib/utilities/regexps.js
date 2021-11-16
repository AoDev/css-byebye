/**
 * Escape a string so that it can be turned into a regex
 * @param  {String} str String to transform
 * @return {String}     Escaped string
 */
function escapeRegExp(str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
}

/**
 * Turn strings from rules to remove into a regexp to concat them later
 * @param  {Mixed Array} rulesToRemove
 * @return {RegExp Array}
 */
function regexize(rulesToRemove) {
  const rulesRegexes = []
  for (let i = 0, l = rulesToRemove.length; i < l; i++) {
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
function concatRegexes(regexes) {
  let rconcat = ''

  if (Array.isArray(regexes)) {
    for (let i = 0, l = regexes.length; i < l; i++) {
      rconcat += regexes[i].source + '|'
    }

    rconcat = rconcat.substr(0, rconcat.length - 1)

    return new RegExp(rconcat)
  }
}

module.exports = {
  regexize,
  concatRegexes,
}

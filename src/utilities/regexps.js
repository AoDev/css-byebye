/**
 * Escape a string so that it can be turned into a regex
 * @param  {String} str String to transform
 * @return {String}     Escaped string
 */
const escapeRegExp = (str) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')

/**
 * Turn strings from rules to remove into a regexp to concat them later
 * @param  {Mixed Array} rulesToRemove
 * @return {RegExp Array}
 */
const regexize = (rulesToRemove) =>
  rulesToRemove.map((rule) =>
    typeof rule === 'string' ? new RegExp('^\\s*' + escapeRegExp(rule) + '\\s*$') : rule
  )

/**
 * Turn strings from rules to remove into one regular expression
 * @param  {Mixed Array} rulesToRemove
 * @return {RegExp}       concatanated regexp
 */
const concatRegexes = (rulesToRemove) => {
  const remregexes = regexize(rulesToRemove)
  if (Array.isArray(remregexes)) {
    return new RegExp(remregexes.map((regex) => regex.source).join('|'))
  }
}

export {concatRegexes}

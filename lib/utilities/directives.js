/**
 * Object.getValues polyfill
 * @param  {Object} obj object
 * @return {Array}
 */
function getValues(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key]
  })
}

const CONTROL_DIRECTIVE_REG_EXP = /^\/\*!? *byebye:?(begin|end)?:(\w+) *\*\/$/

const CONTROL_DIRECTIVES = {
  IGNORE: 'ignore',
}

const CONTROL_DIRECTIVES_BLOCKS = {
  BEGIN: 'begin',
  END: 'end',
}

const controlDirectivesValues = getValues(CONTROL_DIRECTIVES)
const controlDirectivesBlockValues = getValues(CONTROL_DIRECTIVES_BLOCKS)

/**
 * Check if a directive match is a valid one
 * @param  {Mixed Array} match string match
 * @return {Boolean}
 */
function isValidMatchDirective(match) {
  if (Array.isArray(match)) {
    return (
      controlDirectivesValues.indexOf(match[2]) >= 0 &&
      (typeof match[1] === 'undefined' || controlDirectivesBlockValues.indexOf(match[1]) >= 0)
    )
  }
  return false
}

/**
 * Extract a control directive from a comment
 * @param  {Comment} comment postcss comment
 * @return {Directive object}
 */
function getControlDirective(comment) {
  const commentStr = comment.toString()
  const match = commentStr.match(CONTROL_DIRECTIVE_REG_EXP)
  if (match && isValidMatchDirective(match)) {
    const controlDirective = {directive: match[2]}
    if (match[1]) {
      controlDirective.block = match[1]
    }
    return controlDirective
  }
  return null
}

module.exports = {
  CONTROL_DIRECTIVES,
  CONTROL_DIRECTIVES_BLOCKS,
  getControlDirective,
}

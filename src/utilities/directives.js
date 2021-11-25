const CONTROL_DIRECTIVE_REG_EXP = /^\/\*!? *byebye:?(begin|end)?:(\w+) *\*\/$/

const CONTROL_DIRECTIVES = {
  IGNORE: 'ignore',
}

const CONTROL_DIRECTIVES_BLOCKS = {
  BEGIN: 'begin',
  END: 'end',
}

const controlDirectivesValues = Object.values(CONTROL_DIRECTIVES)
const controlDirectivesBlockValues = Object.values(CONTROL_DIRECTIVES_BLOCKS)

/**
 * Check if a directive match is a valid one
 * @param  {Mixed Array} match string match
 * @return {Boolean}
 */
const isValidMatchDirective = (match) => {
  if (Array.isArray(match)) {
    return (
      !!~controlDirectivesValues.indexOf(match[2]) &&
      (typeof match[1] === 'undefined' || !!~controlDirectivesBlockValues.indexOf(match[1]))
    )
  }
  return false
}

/**
 * Extract a control directive from a comment
 * @param  {Comment} comment postcss comment
 * @return {Directive object}
 */
const getControlDirective = (comment) => {
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

export {CONTROL_DIRECTIVES, CONTROL_DIRECTIVES_BLOCKS, getControlDirective}

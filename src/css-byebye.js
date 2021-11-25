/**
 * @module css-byebye
 */

import './utilities/polyfills'
import postcss from 'postcss'
import {CONTROL_DIRECTIVES, CONTROL_DIRECTIVES_BLOCKS} from './utilities/directives'
import {concatRegexes} from './utilities/regexps'
import {filterComments} from './filters/comments'
import {filterRules} from './filters/rules'
import {filterAtRules} from './filters/atRules'

/**
 * Return the actual postcss plugin to remove rules from the css
 */
const cssbyebye = postcss.plugin(
  'css-byebye',
  (options) =>
    function byebye(css) {
      const regex = concatRegexes(options.rulesToRemove)
      let controlDirective = null

      css.walk((node) => {
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
          filterRules(node, regex)
        } else if (node.type === 'atrule') {
          filterAtRules(node, regex)
        }
      })
    }
)

export default cssbyebye

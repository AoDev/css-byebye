import {getControlDirective} from '../utilities/directives'

const filterComments = (comment) => {
  const cd = getControlDirective(comment)
  if (cd) {
    comment.remove()
    return cd
  }
  return null
}

export {filterComments}

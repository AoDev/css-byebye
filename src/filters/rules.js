const filterRules = (rule, regex) => {
  const filtered = rule.selectors.filter((selector) => selector.match(regex) === null)
  if (filtered.length > 1) {
    rule.selector = filtered.join(', ')
  } else if (filtered.length === 1) {
    rule.selector = filtered[0].trim()
  } else {
    rule.remove()
  }
}

export {filterRules}

const filterAtRules = (rule, regex) => {
  const ruleName = '@' + rule.name
  if (ruleName.match(regex) !== null) {
    rule.remove()
  }
}

export {filterAtRules}

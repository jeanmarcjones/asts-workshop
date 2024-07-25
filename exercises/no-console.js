// eslint exercise 0 (no-console)
// When you're finished with this exercise, run
//   "npm start exercise.eslint.1"
//   to move on to the next exercise

const disallowedMethods = ['log', 'info', 'warn']

module.exports = {
  // you're going to need context :)
  create(context) {
    return {
      MemberExpression(node) {
        const isConsoleStatement = looksLike(node, {
          object: {
            name: 'console',
          },
          property: val => !disallowedMethods.includes(val),
          parent: {
            type: 'CallExpression',
          },
        })
        if (!isConsoleStatement) {
          return
        }

        context.report({
          node,
          message: 'Using console is not allowed',
        })
      },
    }
  },
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}

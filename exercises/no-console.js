// eslint exercise 0 (no-console)
// When you're finished with this exercise, run
//   "npm start exercise.eslint.1"
//   to move on to the next exercise

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'no-console',
    },
  },
  create(context) {
    return {
      Identifier(node) {
        const isConsole = node.name === 'console'
        if (!isConsole) {
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

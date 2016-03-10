var babel = require('rollup-plugin-babel')

module.exports = {
  moduleName: 'Adapter',
  moduleId: 'js-data-adapter',
  globals: {
    'js-data': 'JSData'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

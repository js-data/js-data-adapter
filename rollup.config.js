var babel = require('rollup-plugin-babel')

module.exports = {
  moduleName: 'Adapter',
  moduleId: 'js-data-adapter',
  external: [
    'js-data'
  ],
  globals: {
    'js-data': 'JSData'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [
        'es2015-rollup'
      ],
      exclude: 'node_modules/**'
    })
  ]
}

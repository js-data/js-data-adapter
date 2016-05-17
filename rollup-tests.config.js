var babel = require('rollup-plugin-babel')

module.exports = {
  moduleName: 'JSDataAdapterTests',
  moduleId: 'js-data-adapter-tests',
  external: [
    'chai',
    'sinon'
  ],
  globals: {
    chai: 'chai',
    sinon: 'sinon'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [
        'es2015-rollup',
        'stage-0'
      ],
      plugins: [
        'syntax-async-functions',
        'transform-regenerator'
      ],
      exclude: 'node_modules/**'
    })
  ]
}

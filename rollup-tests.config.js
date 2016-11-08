import babel from 'rollup-plugin-babel'

export default {
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
      exclude: 'node_modules/**',
      plugins: [
        'babel-plugin-external-helpers',
        'syntax-async-functions',
        'transform-regenerator'
      ],
      presets: [
        [
          'es2015',
          {
            modules: false
          }
        ],
        'stage-0'
      ]
    })
  ]
}

import babel from 'rollup-plugin-babel'

export default {
  moduleName: 'Adapter',
  amd: {
    id: 'js-data-adapter'
  },
  external: [
    'js-data'
  ],
  globals: {
    'js-data': 'JSData'
  },
  plugins: [
    babel({
      babelrc: false,
      plugins: [
        'external-helpers'
      ],
      presets: [
        [
          'es2015',
          {
            modules: false
          }
        ]
      ],
      exclude: 'node_modules/**'
    })
  ]
}

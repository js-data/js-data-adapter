import babel from 'rollup-plugin-babel'

export default {
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
      exclude: 'node_modules/**',
      plugins: [
        'babel-plugin-external-helpers'
      ],
      presets: [
        [
          'es2015',
          {
            modules: false
          }
        ]
      ]
    })
  ]
}

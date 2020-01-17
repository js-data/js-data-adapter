import babel from 'rollup-plugin-babel'

export default {
  output: {
    amd: {
      id: 'js-data-adapter'
    },
    name: 'Adapter',
    globals: {
      'js-data': 'JSData'
    }
  },
  external: [
    'js-data'
  ],
  plugins: [
    babel({
      babelrc: false,
      plugins: [],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ]
      ],
      exclude: 'node_modules/**'
    })
  ]
}

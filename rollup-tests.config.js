import babel from 'rollup-plugin-babel'

export default {
  output: {
    name: 'JSDataAdapterTests',
    amd: {
      id: 'js-data-adapter-tests'
    },
    globals: {
      chai: 'chai',
      sinon: 'sinon'
    }
  },
  external: [
    'chai',
    'sinon'
  ],
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: [
        '@babel/transform-regenerator'
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ]
      ]
    })
  ]
}

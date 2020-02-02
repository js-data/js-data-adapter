import typescript from 'rollup-plugin-typescript2'

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
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'es2015'
        },
        exclude: [
          'test',
          './rollup.config.js'
        ]
      }
    })
  ]
}

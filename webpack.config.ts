import path from 'path'

export default {
  entry: {
    fn: './fn/index.ts',
    api: './api/index.ts',
    form: './form/index.ts',
    logger: './logger/index.ts',
    routing: './routing/index.ts',
    pagination: './pagination/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      name: ['lib', '[name]'],
      type: 'umd',
    },
    globalObject: 'this',
  },
  externals: {
    qs: {
      commonjs: 'qs',
      commonjs2: 'qs',
    },
    mobx: {
      commonjs: 'mobx',
      commonjs2: 'mobx',
    },
    axios: {
      commonjs: 'axios',
      commonjs2: 'axios',
    },
    ramda: {
      commonjs: 'ramda',
      commonjs2: 'ramda',
    },
    loglevel: {
      commonjs: 'loglevel',
      commonjs2: 'loglevel',
    },
    'sprintf-js': {
      commonjs: 'sprintf-js',
      commonjs2: 'sprintf-js',
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
    },
    'react-router-dom': {
      commonjs: 'react-router-dom',
      commonjs2: 'react-router-dom',
    },
  },
  optimization: {
    nodeEnv: false,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      '@lib': __dirname,
    },
    extensions: ['.ts', '.tsx'],
  },
}

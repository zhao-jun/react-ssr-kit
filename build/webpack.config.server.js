const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = webpackMerge(baseConfig, {
  target: 'node',
  devtool: 'source-map',
  entry: resolve('client/server-entry'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: resolve('server-dist')
  },
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"',
        VUE_ENV: '"server"'
      }
    })
  ]
})

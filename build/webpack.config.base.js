const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 便于以后统一修改路径
const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'web',
  entry: resolve('client/client-entry.jsx'),
  output: {
    filename: 'bundle.js',
    path: resolve('client-dist/public')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('client'), resolve('test')],
      }
    ]
  }
}

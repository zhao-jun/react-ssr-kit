const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 便于以后统一修改路径
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const isDev = process.env.NODE_ENV === 'development'

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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('build/template.html')
    }),
    // 可以在前端代码中使用
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  }
}

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')

// 便于以后统一修改路径
const resolve = (dir) => path.join(__dirname, '..', dir)

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new HtmlWebpackPlugin({
    template: resolve('build/template.html')
  }),
  // 可以在前端代码中使用
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${process.env.NODE_ENV}"`
    }
  })
]

let config

if (isDev) {
  config = webpackMerge(baseConfig, {
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ]),
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader'
          ],
          include: [resolve('client'), resolve('test')],
        }
      ]
    },
    devServer: {
      port: 8000,
      host: '0.0.0.0',
      overlay: {
        errors: true
      },
      hot: true
    }
  })
} else {
  config = webpackMerge(baseConfig, {
    entry: {
      app: resolve('client/client-entry'),
      vender: ['react', 'react-dom']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader'
          ],
          include: [resolve('client'), resolve('test')],
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: {
        name: 'manifest'
      }
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: 'styles.[chunkhash:8].css'
      })
    ])
  })
}

module.exports = config

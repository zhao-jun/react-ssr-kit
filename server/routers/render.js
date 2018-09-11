require('babel-polyfill')
require('babel-register')({
  "presets": [
    [
      "env",
      {
        "modules": 'commonjs'
      }
    ],
    "react"
  ],
  "plugins": [
    'add-module-exports',
    "transform-runtime",
    "syntax-dynamic-import",
    "react-loadable/babel"
  ]
});

const Router = require('koa-router')
// const devSSR = require('./../render/dev-ssr')
const SSR = require('./../render/ssr')
const devSSRLoaderable = require('./../render/dev-ssr-loadable')

const isDev = process.env.NODE_ENV === 'development'

const renderRouter = new Router()
if (isDev) {
  renderRouter.get('*', devSSRLoaderable)
} else {
  renderRouter.get('*', SSR)
}

module.exports = renderRouter

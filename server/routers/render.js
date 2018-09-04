const Router = require('koa-router')
const devSSR = require('./../render/dev-ssr')
const SSR = require('./../render/ssr')

const isDev = process.env.NODE_ENV === 'development'

const renderRouter = new Router()
if (isDev) {
  renderRouter.get('*', devSSR)
} else {
  renderRouter.get('*', SSR)
}

module.exports = renderRouter

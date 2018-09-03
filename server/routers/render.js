const Router = require('koa-router')
const handleSSR = require('./../render/dev-ssr')

const renderRouter = new Router()
renderRouter.get('*', handleSSR)

module.exports = renderRouter

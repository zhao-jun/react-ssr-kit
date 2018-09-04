const Router = require('koa-router')
const send = require('koa-send')
const path = require('path')
// 静态资源处理
const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('*', async ctx => {
  await send(ctx, ctx.path, { root: path.join(__dirname, '../../client-dist') })
})

module.exports = staticRouter

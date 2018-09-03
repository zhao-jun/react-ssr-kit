const Koa = require('koa')
const render = require('koa-art-template')
const renderRouter = require('./routers/render')
const app = new Koa()

render(app, {
  root: __dirname,
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

app.use(renderRouter.routes()).use(renderRouter.allowedMethods())

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3030

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})

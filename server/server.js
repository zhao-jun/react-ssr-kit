const Koa = require('koa')
const render = require('koa-art-template')
const renderRouter = require('./routers/render')
const staticRouter = require('./routers/static')
const path = require('path')
const proxy = require('koa-proxies')
const app = new Koa()

const resolve = (dir) => path.join(__dirname, '..', dir)

render(app, {
  root: resolve('client-dist/public'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  app.use(proxy('/public', {
    target: 'http://localhost:8000'
  }))
} else {
  app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
}
app.use(renderRouter.routes()).use(renderRouter.allowedMethods())

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3030

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})

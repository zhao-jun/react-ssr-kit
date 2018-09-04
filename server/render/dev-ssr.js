const webpack = require('webpack')
const axios = require('axios')
const path = require('path')
const MemoryFS = require('memory-fs')
const template = require('art-template');
const webpackServerConfig = require('./../../build/webpack.config.server')
const { renderToString } = require('react-dom/server')
const Helmet = require('react-helmet').default

// 加载webpack
const mfs = new MemoryFS()
const serverCompiler = webpack(webpackServerConfig)
serverCompiler.outputFileSystem = mfs
let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    webpackServerConfig.output.path,
    webpackServerConfig.output.filename
  )
  bundle = eval(mfs.readFileSync(bundlePath, 'utf-8')).default
  console.log('bundle generated')
})


module.exports = async ctx => {
  // 服务端初次打包未结束
  if (!bundle) {
    ctx.body = 'bundle 正在打包中...'
    return
  }
  // 获取html
  const serverTemplateRes = await axios.get(
    `http://127.0.0.1:8000/public/server.html`
  )
  const serverTemplate = serverTemplateRes.data
  const content = renderToString(bundle())
  const helmet = Helmet.renderStatic()
  const html = template.render(serverTemplate, {
    appString: content,
    title: helmet.title.toString()
  })
  ctx.body = html
}

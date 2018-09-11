


const webpack = require('webpack')
const axios = require('axios')
const path = require('path')
const MemoryFS = require('memory-fs')
const vm = require('vm')
const template = require('art-template')
const webpackServerConfig = require('./../../build/webpack.config.server')
import { renderToString } from 'react-dom/server';
const Helmet = require('react-helmet').default
import bundleServer from '../../client/server-entry'
import React from 'react'
import App from '../../client/app'
import Loadable from 'react-loadable';
import { StaticRouter } from 'react-router-dom';

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
  // 直接执行可能存在污染局部变量的问题，此处无影响，可不处理
  // bundle = eval(mfs.readFileSync(bundlePath, 'utf-8')).default
  // 优化方案，不会污染局部变量和全局变量
  const getModuleFromString = (bundle) => {
    const m = { module, require }
    vm.createContext(m);
    const result = vm.runInContext(bundle, m);
    return result
  }
  bundle = getModuleFromString(mfs.readFileSync(bundlePath, 'utf-8')).default
  console.log('bundle generated')
})


module.exports = async ctx => {
  // 服务端初次打包未结束
  if (!bundle) {
    ctx.body = 'bundle 正在打包中...'
    return
  }

  try {
    // 获取html
    const serverTemplateRes = await axios.get(
      `http://127.0.0.1:8000/public/server.html`
    )
    const serverTemplate = serverTemplateRes.data
    const routerContext = {}
    // react-router异步加载
    let modules = [];
    // let content = bundleServer(ctx.url, routerContext, modules)
    let content = renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <StaticRouter location={ctx.url} context={routerContext}>
          <App/>
        </StaticRouter>
      </Loadable.Capture>
    )
    const helmet = Helmet.renderStatic()
    const html = template.render(serverTemplate, {
      appString: content,
      title: helmet.title.toString()
    })
    ctx.body = html
  } catch (error) {
    console.log('render error', error)
    // throw err
  }
}

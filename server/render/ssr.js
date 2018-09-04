const webpack = require('webpack')
const { renderToString } = require('react-dom/server')
const app = require('../../server-dist/server-entry').default
const Helmet = require('react-helmet').default

module.exports = async ctx => {
  const content = renderToString(app())
  const helmet = Helmet.renderStatic()
  await ctx.render('server', {
    appString: content,
    title: helmet.title.toString()
  })
}

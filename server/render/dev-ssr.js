const webpack = require('webpack')
const { renderToString } = require('react-dom/server')
const app = require('../../server-dist/server-entry').default

module.exports = async ctx => {
  const content = renderToString(app())
  await ctx.render('template', {
    appString: content
  })
}

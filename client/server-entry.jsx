import React from 'react'
import Loadable from 'react-loadable';
import { getRouterData } from './config/router'
import { Switch, Route, Router, StaticRouter } from 'react-router-dom';
import Home from './views/home'
import { renderToString } from 'react-dom/server';
import Loading from './components/common/loading'
import App from './app'

export default (url, context, modules) => renderToString(
  <Loadable.Capture report={moduleName => modules.push(moduleName)}>
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  </Loadable.Capture>
)

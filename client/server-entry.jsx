import React from 'react'
import { getRouterData } from './config/router'
import { Switch, Route, Router, StaticRouter } from 'react-router-dom';
import Home from './views/home'

export default (url, context) =>
  <StaticRouter location={url} context={context}>
    <Switch>
      {
        getRouterData('basic').map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))
      }
    </Switch>
  </StaticRouter>

import React, { Component } from 'react'
import { Switch, Route, Router, BrowserRouter } from 'react-router-dom';
import { getRouterData } from './config/router'
// import './assets/styles/test.less'
// import Loadable from 'react-loadable';
// import PageLoading from './components/common/loading'

// const LoadableHome = Loadable({
//   loader: () => import('./views/home.jsx').then(object => object.default),
//   loading: PageLoading
// });

let router = getRouterData('basic')
export default class App extends Component {
  render() {
    return (
      <Switch>
        {
            router.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))
          }
      </Switch>
    )
  }
}

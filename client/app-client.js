import React, { Component } from 'react'
import { Switch, Route, Router, BrowserRouter } from 'react-router-dom';
import { getRouterData } from './config/router'
import './assets/styles/test.less'

export default class App extends Component {
  // componentWillMount() {
  //   this.routers = getRouterData('basic')
  // }
  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    )
  }
}

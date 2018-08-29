import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Home from './views/home'

const HotRender = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

HotRender(Home)

if (module.hot) {
 module.hot.accept('./views/home', () => {
   HotRender(require('./views/home').default)
 })
}

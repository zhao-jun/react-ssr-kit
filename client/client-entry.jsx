import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'

const HotRender = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

HotRender(App)

if (module.hot) {
 module.hot.accept('./app', () => {
   HotRender(require('./app').default)
 })
}

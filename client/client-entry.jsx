import React from 'react'
import { render, hydrate } from 'react-dom'
import App from './app-client'
import Loadable from 'react-loadable'

window.main = () => {
  Loadable.preloadReady().then(() => {
    hydrate(<App/>, document.getElementById('root'))
  })
}
// todo 不同环境区分对待
// render(<App/>, document.getElementById('root'))

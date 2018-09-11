import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>home</title>
          <meta name="description" content="This is description" />
        </Helmet>
        home
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    )
  }
}

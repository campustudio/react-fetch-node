import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router' // eslint-disable-line
import BasicRoutes from '../routes/BasicRoutes'

export default class App extends React.Component {
  render() {
    return (
      <Router routes={BasicRoutes} history={browserHistory} />
    )
  }
}

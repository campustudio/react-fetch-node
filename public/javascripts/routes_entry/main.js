import {render} from 'react-dom'
import React from 'react'
import {Router, browserHistory} from 'react-router' // eslint-disable-line
import BasicRoutes from '../routes/BasicRoutes'

export default class App extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <Router routes={BasicRoutes} history={browserHistory} />
    )
  }
}

render(<App/>, document.getElementById('app'))

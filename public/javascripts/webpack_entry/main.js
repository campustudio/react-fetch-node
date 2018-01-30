import {render} from 'react-dom'
import React from 'react'
import {Router, browserHistory} from 'react-router' // eslint-disable-line
import 'ant-design-pro/dist/ant-design-pro.css'
import BasicRoutes from '../routes/BasicRoutes'

export default class Main extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <Router routes={BasicRoutes} history={browserHistory} />
    )
  }
}

render(<Main/>, document.getElementById('app'))

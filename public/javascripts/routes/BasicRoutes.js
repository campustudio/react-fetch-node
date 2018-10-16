import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom' // eslint-disable-line
import {Router, Route, IndexRoute, browserHistory} from 'react-router' // eslint-disable-line
import Sidebar from '../modules/demo/Sidebar'

module.exports = (
  <Router history={browserHistory}>
    <IndexRoute component={Sidebar}/>
    <Route path="/" component={Sidebar}/>
  </Router>
)

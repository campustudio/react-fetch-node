import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom' // eslint-disable-line
import {Router, Route, IndexRoute, browserHistory} from 'react-router' // eslint-disable-line
import Home from '../modules/draft/Home'
import LifeCycle from '../modules/draft/LifeCycle'

module.exports = (
  <Router history={browserHistory}>
    <IndexRoute component={Home}/>
    {/* <Route path="/" component={Home}/> */}
    <Route path="/" component={LifeCycle}/>
  </Router>
)

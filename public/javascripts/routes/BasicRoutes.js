import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom' // eslint-disable-line
import { Router, Route, IndexRoute, browserHistory } from 'react-router' // eslint-disable-line
import Home from '../modules/demo/Home'
import Algorithm from '../modules/demo/Algorithm'
import Sidebar from '../modules/demo/Sidebar'
import GoogleSpeechRecognition from '../modules/demo/GoogleSpeechRecognition'
import AntDefault from '../modules/demo/upload/AntDefault'

export default (
  <Router history={browserHistory}>
    <IndexRoute component={Home}/>
    <Route path="/" component={Algorithm}>
      <Route path="/upload/ant/default" component={AntDefault}/>
      <Route path="/battle/angel" component={GoogleSpeechRecognition}/>
    </Route>
  </Router>
)

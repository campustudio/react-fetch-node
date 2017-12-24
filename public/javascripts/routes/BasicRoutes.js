import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Home from '../modules/indexes/Home';

module.exports = (
  <Router history={browserHistory}>
    <IndexRoute component={Home}/>
    <Route path="/" component={Home}/>
  </Router>
);

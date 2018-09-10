import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router' // eslint-disable-line
import BasicRoutes from '../routes/BasicRoutes'
import store from "../store/index";
import { Provider } from 'react-redux';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router routes={BasicRoutes} history={browserHistory} />
      </Provider>
    )
  }
}

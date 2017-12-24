import { render } from 'react-dom';
import React from 'react'; // eslint-disable-line
// import App from './App';
import {Router, browserHistory} from "react-router";
import BasicRoutes from "../routes/BasicRoutes";

export default class App extends React.Component {
  componentDidMount() {
  }

  wanna() {
    console.log('wanna')
  }

  render() {
    return (
      // <div><a onClick={this.wanna} style={{cursor:'pointer'}}>wanna</a></div>
      <Router routes={BasicRoutes} history={browserHistory} />
    )
  }
}

render(<App/>, document.getElementById('app'));
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import 'ant-design-pro/dist/ant-design-pro.css'
import '../../stylesheets/style.css'
import App from './App'

const render = Component => {
  ReactDOM.render(
      <Component />,
    document.getElementById('app'),
  )
}

render(App)

if(module.hot) {
  module.hot.accept();
}

// Webpack Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./App', () => {
//     render(App)
//   })
// }

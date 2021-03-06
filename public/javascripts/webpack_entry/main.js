import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
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

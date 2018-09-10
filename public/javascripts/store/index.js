import { browserHistory } from 'react-router'
import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'
import initialState from './initialState'

const logger = store => next => action => {
  return next(action)
}
const middleware = routerMiddleware(browserHistory)

// const allStoreEnhancers = compose(
//   applyMiddleware(thunk),
// )

export default applyMiddleware(
  thunk,
  middleware,
  logger
)(createStore)(rootReducer, initialState, window.devToolsExtension && window.devToolsExtension())

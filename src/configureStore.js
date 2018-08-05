import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { connectRoutes } from 'redux-first-router'
import createSagaMiddleware from 'redux-saga'

import routesMap from './routesMap'
import * as reducers from './reducers'
import * as actionCreators from './actions'
import rootSaga from './sagas'

const composeEnhancers = (...args) =>
  isClient()
    ? composeWithDevTools({ actionCreators })(...args)
    : compose(...args)

const isClient = () => typeof window === 'object' && window.document

const configureStore = (history, preLoadedState) => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(
    history,
    routesMap
  )

  const rootReducer = combineReducers({ ...reducers, location: reducer })
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = applyMiddleware(middleware, sagaMiddleware)
  const enhancers = composeEnhancers(enhancer, middlewares)
  const store = createStore(rootReducer, preLoadedState, enhancers)

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers/index', () => {
      // eslint-disable-next-line no-shadow
      const reducers = require('./reducers/index')
      // eslint-disable-next-line no-shadow
      const rootReducer = combineReducers({ ...reducers, location: reducer })
      store.replaceReducer(rootReducer)
    })
  }

  if (isClient()) {
    sagaMiddleware.run(rootSaga)
  }

  return { store, thunk }
}

export default configureStore

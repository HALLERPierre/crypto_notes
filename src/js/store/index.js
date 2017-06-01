import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import Immutable from 'immutable'

import thunk from 'redux-thunk'

import reducers from '../reducers'
import history from '../router/history'

function getPreloadedState() {
    return {}
}

function getMiddleware() {
    let middleware = [
        thunk,
        routerMiddleware(history)
    ]

    return applyMiddleware(...middleware)
}

const composeEnhancers = (process.env.NODE_ENV !== 'production') &&
global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize : {
            immutable: Immutable,
        }
    }) : compose

const enhancer = composeEnhancers(
    getMiddleware(),
)


export const store = createStore(
    reducers,
    getPreloadedState(),
    enhancer
)

export const getState = store.getState

export const dispatch = store.dispatch

export default store

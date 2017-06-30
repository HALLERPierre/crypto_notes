import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import thunk from 'redux-thunk'

import { user } from '../reducers'

function getPreloadedState() {
    return {}
}

export const history = createHistory()

function getMiddleware() {
    let middleware = [
        thunk,
        routerMiddleware(history)
    ]

    return applyMiddleware(...middleware)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
    getMiddleware(),
)

export const store = createStore(
    combineReducers({
        user,
        router: routerReducer
    }),
    getPreloadedState(),
    enhancer
)

export const getState = store.getState

export const dispatch = store.dispatch

export default store

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import Immutable from 'immutable'

import thunk from 'redux-thunk'

import { noteApp } from '../reducers'

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

const composeEnhancers = compose

const enhancer = composeEnhancers(
    getMiddleware(),
)


export const store = createStore(
    noteApp,
    getPreloadedState(),
    enhancer
)

export const getState = store.getState

export const dispatch = store.dispatch

export default store

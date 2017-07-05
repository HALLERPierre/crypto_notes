import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import throttle from 'lodash.throttle';

import { user, notes } from '../reducers';
import { loadState, saveState } from './LocalStorage';

export const history = createHistory();

const getMiddleware = () => {
    let middleware = [
        thunk,
        routerMiddleware(history)
    ];

    return applyMiddleware(...middleware);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    getMiddleware(),
);

const persistedState = loadState();
const store = createStore(
    combineReducers({
        user,
        notes,
        router: routerReducer
    }),
    persistedState,
    enhancer
);

store.subscribe(throttle(() => {
    const state = store.getState();
    saveState(state);
}, 1000));


export const getState = store.getState();
export const dispatch = store.dispatch;
export default store;

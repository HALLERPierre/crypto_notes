import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import { Login, Notes } from '../containers'

const history = createHistory()
const Auth = {isAuthenticated: false}

//Spread operator
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Auth.isAuthenticated
            ? (<Component {...props}/>)
            : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>
            )
    )}/>
)

const App = ({ store }) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={ Notes } />
                <Route exact path="/login" component={ Login } />
            </Switch>
        </ConnectedRouter>
    </Provider>
)

App.propTypes = {
    store: PropTypes.object.isRequired,
}

export default App

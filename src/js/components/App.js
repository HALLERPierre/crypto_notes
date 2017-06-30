import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Redirect } from 'react-router'
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
        <Router history={history}>
            <PrivateRoute path="/" component={ Notes }>
                <Route path="/login" component={ Login }/>
            </PrivateRoute>
        </Router>
    </Provider>
)

App.propTypes = {
    store: PropTypes.object.isRequired,
}

export default App

import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import {Login, Notes} from '../containers'
import { connect } from 'react-redux'

const history = createHistory()

//Spread operator
const PrivateRoute = ({ component: Component, connected,...rest }) => (
    <Route {...rest} render={props => (
        connected
            ? (<Component {...props}/>)
            : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>
            )
    )}/>
)

const Routes = (props) => (
	<ConnectedRouter history={history}>
   		<Switch>
   		    <PrivateRoute exact path="/" component={ Notes } connected={props.connected} />
   		    <Route exact path="/login" component={ Login } />
   		</Switch>
	</ConnectedRouter>
)

const mapStateToProps = (state) => {
    return {
    	connected: state.user.connected
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const Router = connect(
    mapStateToProps,
    mapDispatchToProps
)(Routes)

export default Router

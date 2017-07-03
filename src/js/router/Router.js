import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { history } from '../store';
import { ConnectedRouter } from 'react-router-redux';
import {Login, Notes} from '../containers';
import { connect } from 'react-redux';

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
);

const DefaultLayout = ({ ...props }) => (
    <div className="DefaultLayout">
        <header>Header</header>
        {props.children}
        <footer>Footer</footer>
    </div>
);

const NotesLayout = ({ component: Component, ...props }) => (
    <DefaultLayout {...props}>
        <Notes />
    </DefaultLayout>
);

const Routes = (props) => (
	<ConnectedRouter history={history}>
   		<Switch>
   		    <PrivateRoute exact path="/" component={ NotesLayout } connected={props.connected} />
   		    <Route exact path="/login" component={ Login } />
   		</Switch>
	</ConnectedRouter>
);

const mapStateToProps = (state) => {
    return {
    	connected: state.user.connected,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const Router = connect(
    mapStateToProps,
    mapDispatchToProps
)(Routes);

export default Router;

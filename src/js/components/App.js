import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../store';

import PrivateRoute from '../router/PrivateRoute';
import NotesLayout from '../layout/Layout';
import { Login } from '../containers';

const App = ({ store }) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={ NotesLayout } />
                <Route exact path="/login" component={ Login } />
            </Switch>
        </ConnectedRouter>
    </Provider>
);

App.propTypes = {
    store: PropTypes.object.isRequired,
}

export default App;

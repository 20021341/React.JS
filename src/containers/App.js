import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import Home from '../routes/Home';
//import Login from '../routes/Login';
import Login from './Auth/Login';
import Header from './Header/Header';
import HeadQuarter from '../routes/HeadQuarter';
import Agent from '../routes/Agent';
import Factory from '../routes/Factory';
import Center from '../routes/Center';

import { CustomToastCloseButton } from '../components/CustomToast';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        {this.props.isLoggedIn && <Header />}

                        <span className="content-container">
                            <Switch>
                                <Route path='/' exact component={(Home)} />
                                <Route path='/login' component={userIsNotAuthenticated(Login)} />
                                <Route path='/hq' component={userIsAuthenticated(HeadQuarter)} />
                                <Route path='/agent' component={userIsAuthenticated(Agent)} />
                                <Route path='/factory' component={userIsAuthenticated(Factory)} />
                                <Route path='/center' component={userIsAuthenticated(Center)} />
                            </Switch>
                        </span>

                        <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
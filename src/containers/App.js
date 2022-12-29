import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import Home from '../routes/Home';
import Login from './Auth/Login';
import Header from './Header/Header';
import HeadQuarter from '../routes/HeadQuarter';
import Agent from '../routes/Agent';
import Factory from '../routes/Factory';
import Center from '../routes/Center';

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
        if (!this.props.isLoggedIn) {
            history.push('/login')
        }

        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        {this.props.isLoggedIn && <Header />}

                        <span className="content-container">
                            <Switch>
                                <Route path='/' exact component={(Home)} />

                                {/* đường dẫn login */}
                                <Route path='/login' component={userIsNotAuthenticated(Login)} />

                                {/* đường dẫn của ban điều hành */}
                                <Route path='/hq' component={userIsAuthenticated(HeadQuarter)} />

                                {/* đường dẫn của đại lý phân phối */}
                                <Route path='/agent' component={userIsAuthenticated(Agent)} />

                                {/* đường dẫn của nhà máy */}
                                <Route path='/factory' component={userIsAuthenticated(Factory)} />
                                
                                {/* đường dẫn của trung tâm bảo hành */}
                                <Route path='/center' component={userIsAuthenticated(Center)} />
                            </Switch>
                        </span>
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
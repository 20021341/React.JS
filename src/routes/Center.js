import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import BadProductManage from '../containers/Center/BadProductManage';


class Center extends Component {
    render() {
        return (
            <div className="center-container">
                <Switch>
                    <Route path="/center/bad-products-manage" component={BadProductManage} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
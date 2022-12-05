import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import GoodProductManage from '../containers/Factory/GoodProductManage';
import BadProductManage from '../containers/Factory/BadProductManage';


class Factory extends Component {
    render() {
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/factory/good-products-manage" component={GoodProductManage} />
                        <Route path="/factory/bad-products-manage" component={BadProductManage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Factory);

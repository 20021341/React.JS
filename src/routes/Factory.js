import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import GoodProductManage from '../containers/Factory/GoodProductManage';
import BadProductManage from '../containers/Factory/BadProductManage';
import Statistics from '../containers/Factory/Statistics';



class Factory extends Component {
    render() {
        return (
            <div className="factory-container">
                <Switch>
                    <Route path="/factory/statistics" component={Statistics} />
                    <Route path="/factory/good-products-manage" component={GoodProductManage} />
                    <Route path="/factory/bad-products-manage" component={BadProductManage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Factory);

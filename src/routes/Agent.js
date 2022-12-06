import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import BadProductManage from '../containers/Agent/BadProductManage';
import BillManage from '../containers/Agent/BillManage';
import GoodProductManage from '../containers/Agent/GoodProductManage';
import WarrantyCardManage from '../containers/Agent/WarrantyCardManage';


class Agent extends Component {
    render() {
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/agent/good-products-manage" component={GoodProductManage} />
                        <Route path="/agent/bad-products-manage" component={BadProductManage} />
                        <Route path="/agent/bills-manage" component={BillManage} />
                        <Route path="/agent/cards-manage" component={WarrantyCardManage} />
                        <Redirect to="/" />
                    </Switch>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Agent);

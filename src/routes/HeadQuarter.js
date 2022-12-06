import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import FacilityManage from '../containers/HeadQuarter/FacilityManage';
import CustomerMangage from '../containers/HeadQuarter/CustomerMangage';
import ProductLineManage from '../containers/HeadQuarter/ProductLineManage';

class HeadQuarter extends Component {
    render() {
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/hq/facility-manage" component={FacilityManage} />
                        <Route path="/hq/customer-manage" component={CustomerMangage} />
                        <Route path="/hq/product-line-manage" component={ProductLineManage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HeadQuarter);

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import FacilityManage from '../containers/HeadQuarter/FacilityManage';
import CustomerManage from '../containers/HeadQuarter/CustomerManage';
import ProductLineManage from '../containers/HeadQuarter/ProductLineManage';

class HeadQuarter extends Component {
    render() {
        return (
            <div className="head-quarter-container">
                <Switch>
                    {/* đường dẫn chức năng quản lý cơ sở */}
                    <Route path="/hq/facility-manage" component={FacilityManage} />

                    {/* đường dẫn chức năng quản lý khách hàng */}
                    <Route path="/hq/customer-manage" component={CustomerManage} />
                    
                    {/* đường dẫn chức năng quản lý dòng sản phẩm */}
                    <Route path="/hq/product-line-manage" component={ProductLineManage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HeadQuarter);

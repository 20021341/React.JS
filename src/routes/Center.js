import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import BadProductManage from '../containers/Center/BadProductManage';
import WarrantyStatistics from '../containers/Center/WarrantyStatistics';


class Center extends Component {
    render() {
        return (
            <div className="center-container">
                <Switch>
                    {/* đường dẫn chức năng thống kê */}
                    <Route path="/center/warranty-statistics" component={WarrantyStatistics} />
                    
                    {/* đường dẫn chức năng quản lý sản phẩm bảo hành */}
                    <Route path="/center/bad-products-manage" component={BadProductManage} />
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
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
                    {/* đường dẫn chức năng thống kê */}
                    <Route path="/factory/statistics" component={Statistics} />

                    {/* đường dẫn chức năng quản lý sản phẩm tồn kho */}
                    <Route path="/factory/good-products-manage" component={GoodProductManage} />
                    
                    {/* đường dẫn chức năng quản lý sản phẩm lỗi */}
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

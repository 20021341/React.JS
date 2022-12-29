import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import BadProductManage from '../containers/Agent/BadProductManage';
import BillManage from '../containers/Agent/BillManage';
import GoodProductManage from '../containers/Agent/GoodProductManage';
import RetrieveProduct from '../containers/Agent/RetrieveProduct';
import SalesStatistics from '../containers/Agent/SalesStatistics';
import WarrantyCardManage from '../containers/Agent/WarrantyCardManage';


class Agent extends Component {
    render() {
        return (
            <div className="agent-container">
                <Switch>
                    {/* đường dẫn chức năng thống kê */}
                    <Route path="/agent/sales-statistics" component={SalesStatistics} />

                    {/* đường dẫn chức năng quản lý sản phẩm tồn kho */}
                    <Route path="/agent/good-products-manage" component={GoodProductManage} />

                    {/* đường dẫn quản lý sản phẩm lỗi, bảo hành */}
                    <Route path="/agent/bad-products-manage" component={BadProductManage} />

                    {/* đường dẫn quản lý hóa đơn */}
                    <Route path="/agent/bills-manage" component={BillManage} />

                    {/* đường dẫn quản lý phiếu bảo hành */}
                    <Route path="/agent/cards-manage" component={WarrantyCardManage} />

                    {/* đường dẫn triệu hồi sản phẩm lỗi từ khách hàng */}
                    <Route path="/agent/retrieve-products" component={RetrieveProduct} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Agent);

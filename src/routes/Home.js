import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn } = this.props
        const { facility } = this.props

        let linkToRedirect = ''

        if (!isLoggedIn) {
            // khi chưa đăng nhập thành công thì ở lại màn hình đăng nhập
            linkToRedirect = '/login'
        } else {
            switch (facility.role) {
                case 'agent':
                    // nếu cơ sở đăng nhập là đại lý
                    // mặc định vào chức năng thống kê của đại lý
                    linkToRedirect = '/agent/sales-statistics'
                    break
                case 'center':
                    // nếu cơ sở đăng nhập là trung tâm bảo hành
                    // mặc định vào chức năng thống kê của trung tâm bảo hành
                    linkToRedirect = '/center/warranty-statistics'
                    break
                case 'factory':
                    // nếu cơ sở đăng nhập là nhà máy
                    // mặc định vào chức năng thống kê của nhà máy
                    linkToRedirect = '/factory/statistics'
                    break
                case 'admin':
                    // nếu cơ sở đăng nhập là ban điều hành
                    // mặc định vào chức năng quản lý cơ sở
                    linkToRedirect = '/hq/facility-manage'
            }
        }

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        facility: state.user.facility
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

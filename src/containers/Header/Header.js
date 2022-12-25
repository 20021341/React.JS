import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from './Navigator';
import { headquarterMenu, agentMenu, factoryMenu, centerMenu } from './menuApp';
import ModalConfirm from '../Modal/ModalConfirm'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: [],
            is_modal_confirm_open: false
        }
    }

    componentDidMount() {
        let { facility } = this.props
        let menu = []
        if (facility) {
            let role = facility.role
            if (role === 'admin') {
                menu = headquarterMenu
            }

            if (role === 'agent') {
                menu = agentMenu
            }

            if (role === 'factory') {
                menu = factoryMenu
            }

            if (role === 'center') {
                menu = centerMenu
            }
        }

        this.setState({
            menuApp: menu
        })
    }

    logout = async () => {
        const { processLogout } = this.props
        processLogout()
        this.toggleModalLogout()
    }

    logoutButton = () => {
        this.setState({
            is_modal_confirm_open: true
        })
    }

    toggleModalLogout = () => {
        this.setState({
            is_modal_confirm_open: !this.state.is_modal_confirm_open
        })
    }

    render() {
        const { facility } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='facility-name'>
                    {facility && facility.facility_name ? facility.facility_name : ''}
                </div>

                <ModalConfirm
                    isOpen={this.state.is_modal_confirm_open}
                    toggleModalConfirm={this.toggleModalLogout}
                    onConfirm={this.logout}
                    message={'Bạn có muốn đăng xuất không?'}
                />

                {/* nút logout */}
                <div className="btn btn-logout" onClick={() => this.logoutButton()}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        facility: state.user.facility,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

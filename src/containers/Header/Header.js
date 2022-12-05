import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { headquarterMenu, agentMenu, factoryMenu, centerMenu } from './menuApp';
import './Header.scss';
import { ROLE } from '../../utils'
import _ from 'lodash'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {
        let { facility } = this.props
        let menu = []
        if (facility && !_.isEmpty(facility)) {
            let role = facility.role
            if (role === ROLE.HEAD_QUARTER) {
                menu = headquarterMenu
            }

            if (role === ROLE.AGENT) {
                menu = agentMenu
            }

            if (role === ROLE.FACTORY) {
                menu = factoryMenu
            }

            if (role === ROLE.MT_CENTER) {
                menu = centerMenu
            }
        }

        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, facility } = this.props;
        console.log(facility)

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='facility-name'>
                    {facility && facility.facility_name ? facility.facility_name : ''}
                </div>

                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
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

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn } = this.props
        const { facility } = this.props

        let linkToRedirect = ''

        if (!isLoggedIn) {
            linkToRedirect = '/login'
        } else {
            switch (facility.role) {
                case 'agent':
                    linkToRedirect = '/agent/sales-statistics'
                    break
                case 'center':
                    linkToRedirect = '/center/warranty-statistics'
                    break
                case 'factory':
                    linkToRedirect = '/factory/sale-rate-statistics'
                    break
                case 'admin':
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { handleLoginAPI } from '../../services/facilityService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facility_id: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleOnChangeFacilityID = (event) => {
        this.setState({
            facility_id: event.target.value
        });
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        });

        try {
            let data = await handleLoginAPI(this.state.facility_id, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                });
            }

            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.facility);
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    });
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>ID</label>
                            <input type='text' className='form-control' placeholder='Enter id...'
                                value={this.state.facility_id}
                                onChange={(event) => this.handleOnChangeFacilityID(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Enter password...'
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangePassword(event)} />
                            <span onClick={() => this.handleShowHidePassword()}>
                                <i className={this.state.isShowPassword ? 'far fa-eye-slash' : 'far fa-eye'}></i>
                            </span>
                        </div>

                        <div className='col-12' style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='login-button' onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span>Or sign in with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (facility) => dispatch(actions.userLoginSuccess(facility)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

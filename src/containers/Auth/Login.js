import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { handleLogin } from '../../services/siteService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facility_id: '',
            password: '',
            facility_id_alert: '',
            password_alert: '',
            res_message: '',
            is_password_showed: false,
        }
    }

    handleOnChangeInput = (event, field) => {
        let copyState = { ...this.state }
        copyState[field] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log(this.state)
        })
    }

    // kiểm tra xem input nhập vào có hợp lệ hay không (có rỗng hay không, có đúng định dạng không)
    checkValidInput = () => {
        let isValid = true
        let arrInput = ['facility_id', 'password']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                switch (arrInput[i]) {
                    case 'facility_id':
                        this.setState({ facility_id_alert: 'Chưa nhập mã cơ sở' })
                        break
                    case 'password':
                        this.setState({ password_alert: 'Chưa nhập mật khẩu' })
                        break
                }
            }
        }
        return isValid
    }

    // đăng nhập vào hệ thống, chỉ được đăng nhập khi thông tin nhập vào là đúng
    login = async () => {
        this.setState({
            facility_id_alert: '',
            password_alert: '',
            res_message: ''
        })

        if (this.checkValidInput()) {
            // gọi api, truyền vào mã cơ sở và mật khẩu
            let res = await handleLogin(this.state.facility_id, this.state.password);

            if (res && res.errCode === 0) {
                // đăng nhập thành công
                this.props.userLoginSuccess(res.facility);
            } else {
                this.setState({ res_message: res.message })
            }
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.login()
        }
    }

    // ẩn/hiển thị mật khẩu
    handleShowHidePassword = () => {
        this.setState({
            is_password_showed: !this.state.is_password_showed
        });
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 login-text'>Đăng nhập</div>

                        <div className='col-12 form-group login-input'>
                            <div>
                                <label style={{ float: 'left' }}>Mã cơ sở</label>
                                <label style={{ color: 'yellow', float: 'right' }}>
                                    {this.state.facility_id_alert}
                                </label>
                            </div>

                            <input type='text' className='form-control' placeholder='Nhập mã cơ sở...'
                                value={this.state.facility_id}
                                onChange={(event) => { this.handleOnChangeInput(event, 'facility_id') }}
                                onKeyDown={(event) => this.handleKeyDown(event)} />

                        </div>

                        <div className='col-12 form-group login-input'>
                            <div>
                                <label style={{ float: 'left' }}>Mật khẩu</label>

                                <label style={{ color: 'yellow', float: 'right' }}>
                                    {this.state.password_alert}
                                </label>
                            </div>

                            <input type={this.state.is_password_showed ? 'text' : 'password'} className='form-control' placeholder='Nhập mật khẩu...'
                                value={this.state.password}
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                onKeyDown={(event) => this.handleKeyDown(event)} />

                            <span onClick={() => this.handleShowHidePassword()}>
                                <i className={this.state.is_password_showed ? 'far fa-eye-slash' : 'far fa-eye'}></i>
                            </span>
                        </div>

                        <div className='col-12' style={{ color: "yellow" }}>
                            {this.state.res_message}
                        </div>

                        <div className='col-12'>
                            <button className='login-button' onClick={() => this.login()}>Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
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

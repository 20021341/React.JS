import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalCreateFacility extends Component {

    constructor(props) {
        super(props)
        this.state = {
            facility_name: '',
            password: '123456',
            phone_number: '',
            address: '',
            role: '',
            facility_name_alert: '',
            password_alert: '',
            phone_number_alert: '',
            address_alert: '',
            role_alert: '',
            res_message: ''
        }
    }

    componentDidMount() {
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

    // nút tạo cơ sở mới
    createFacilityButton = () => {
        this.setState({
            facility_name_alert: '',
            password_alert: '',
            phone_number_alert: '',
            address_alert: '',
            role_alert: '',
            res_message: ''
        })

        if (this.checkValidInput()) {
            let data = {
                facility_name: this.state.facility_name.trim().replace(/\s+/g, ' '),
                password: this.state.password.trim(),
                phone_number: this.state.phone_number.trim(),
                address: this.state.address,
                role: this.state.role
            }

            // gửi dữ liệu cho component quản lí cơ sở để gọi api
            // nó trả dữ liệu cho modal để cập nhật res_message thông báo tin nhắn trả về
            let res = this.props.createFacility(data)

            res.then((obj) => {
                if (obj.errCode === 0) {
                    this.toggle()
                } else {
                    this.setState({ res_message: obj.message })
                }
            })
        }
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['facility_name', 'password', 'phone_number', 'address', 'role']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                switch (arrInput[i]) {
                    case 'facility_name':
                        this.setState({ facility_name_alert: 'Chưa nhập tên cơ sở' })
                        break
                    case 'password':
                        this.setState({ password_alert: 'Chưa nhập mật khẩu' })
                        break
                    case 'phone_number':
                        this.setState({ phone_number_alert: 'Chưa nhập số điện thoại' })
                        break
                    case 'address':
                        this.setState({ address_alert: 'Chưa chọn địa chỉ' })
                        break
                    case 'role':
                        this.setState({ role_alert: 'Chưa chọn vai trò' })
                        break
                }
            }
        }

        if (!this.nameValidate(this.state.facility_name)) {
            isValid = false
            this.setState({ facility_name_alert: 'Tên cơ sở không đúng định dạng' })
        }

        if (!this.phoneNumberValidate(this.state.phone_number)) {
            isValid = false
            this.setState({ phone_number_alert: 'Số điện thoại không đúng định dạng' })
        }

        return isValid
    }

    nameValidate = (name) => {
        var regExp = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
        return regExp.test(name)
    }

    phoneNumberValidate = (phone_number) => {
        var regExp = /^(0[234][0-9]{8}|1[89]00[0-9]{4})$/
        return regExp.test(phone_number)
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.createFacilityButton()
        }
    }

    toggle = () => {
        this.setState({
            facility_name: '',
            password: '123456',
            phone_number: '',
            address: '',
            role: '',
            facility_name_alert: '',
            phone_number_alert: '',
            address_alert: '',
            role_alert: '',
            res_message: ''
        })

        this.props.toggleModal()
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>Mở cơ sở mới</ModalHeader>

                <ModalBody>
                    <div className='modal-body'>
                        <div className='input-container'>
                            <div>
                                <label style={{ float: 'left' }}>Tên cơ sở</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.facility_name_alert}
                                </label>
                            </div>

                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'facility_name') }}
                                value={this.state.facility_name}
                                onKeyDown={(event) => this.handleKeyDown(event)} />
                        </div>

                        <div className='input-container'>
                            <div>
                                <label style={{ float: 'left' }}>Mật khẩu {'(Mặc định là 123456)'}</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.password_alert}
                                </label>
                            </div>

                            <input type='password' onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                value={this.state.password}
                                onKeyDown={(event) => this.handleKeyDown(event)} />
                        </div>

                        <div className='input-container'>
                            <div>
                                <label style={{ float: 'left' }}>Số điện thoại</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.phone_number_alert}
                                </label>
                            </div>

                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'phone_number') }}
                                value={this.state.phone_number}
                                onKeyDown={(event) => this.handleKeyDown(event)} />
                        </div>

                        <div className='select-container'>
                            <div>
                                <label style={{ float: 'left' }}>Địa chỉ</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.address_alert}
                                </label>
                            </div>

                            <select name='address' onChange={(event) => { this.handleOnChangeInput(event, 'address') }} >
                                <option value={''} selected={'selected'}>--Thành phố--</option>
                                <option value={'An Giang'}>An Giang</option>
                                <option value={'Bà Rịa - Vũng Tàu'}>Bà Rịa - Vũng Tàu</option>
                                <option value={'Bắc Giang'}>Bắc Giang</option>
                                <option value={'Bắc Kạn'}>Bắc Kạn</option>
                                <option value={'Bạc Liêu'}>Bạc Liêu</option>
                                <option value={'Bắc Ninh'}>Bắc Ninh</option>
                                <option value={'Bến Tre'}>Bến Tre</option>
                                <option value={'Bình Định'}>Bình Định</option>
                                <option value={'Bình Dương'}>Bình Dương</option>
                                <option value={'Bình Phước'}>Bình Phước</option>
                                <option value={'Bình Thuận'}>Bình Thuận</option>
                                <option value={'Bình Thuận'}>Bình Thuận</option>
                                <option value={'Cà Mau'}>Cà Mau</option>
                                <option value={'Cao Bằng'}>Cao Bằng</option>
                                <option value={'Đắk Lắk'}>Đắk Lắk</option>
                                <option value={'Đắk Nông'}>Đắk Nông</option>
                                <option value={'Điện Biên'}>Điện Biên</option>
                                <option value={'Đồng Nai'}>Đồng Nai</option>
                                <option value={'Đồng Tháp'}>Đồng Tháp</option>
                                <option value={'Đồng Tháp'}>Đồng Tháp</option>
                                <option value={'Gia Lai'}>Gia Lai</option>
                                <option value={'Hà Giang'}>Hà Giang</option>
                                <option value={'Hà Nam'}>Hà Nam</option>
                                <option value={'Hà Tĩnh'}>Hà Tĩnh</option>
                                <option value={'Hải Dương'}>Hải Dương</option>
                                <option value={'Hậu Giang'}>Hậu Giang</option>
                                <option value={'Hòa Bình'}>Hòa Bình</option>
                                <option value={'Hưng Yên'}>Hưng Yên</option>
                                <option value={'Khánh Hòa'}>Khánh Hòa</option>
                                <option value={'Kiên Giang'}>Kiên Giang</option>
                                <option value={'Kon Tum'}>Kon Tum</option>
                                <option value={'Lai Châu'}>Lai Châu</option>
                                <option value={'Lâm Đồng'}>Lâm Đồng</option>
                                <option value={'Lạng Sơn'}>Lạng Sơn</option>
                                <option value={'Lào Cai'}>Lào Cai</option>
                                <option value={'Long An'}>Long An</option>
                                <option value={'Nam Định'}>Nam Định</option>
                                <option value={'Nghệ An'}>Nghệ An</option>
                                <option value={'Ninh Bình'}>Ninh Bình</option>
                                <option value={'Ninh Thuận'}>Ninh Thuận</option>
                                <option value={'Phú Thọ'}>Phú Thọ</option>
                                <option value={'Quảng Bình'}>Quảng Bình</option>
                                <option value={'Quảng Bình'}>Quảng Bình</option>
                                <option value={'Quảng Ngãi'}>Quảng Ngãi</option>
                                <option value={'Quảng Ninh'}>Quảng Ninh</option>
                                <option value={'Quảng Trị'}>Quảng Trị</option>
                                <option value={'Sóc Trăng'}>Sóc Trăng</option>
                                <option value={'Sơn La'}>Sơn La</option>
                                <option value={'Tây Ninh'}>Tây Ninh</option>
                                <option value={'Thái Bình'}>Thái Bình</option>
                                <option value={'Thái Nguyên'}>Thái Nguyên</option>
                                <option value={'Thanh Hóa'}>Thanh Hóa</option>
                                <option value={'Thừa Thiên Huế'}>Thừa Thiên Huế</option>
                                <option value={'Tiền Giang'}>Tiền Giang</option>
                                <option value={'Trà Vinh'}>Trà Vinh</option>
                                <option value={'Tuyên Quang'}>Tuyên Quang</option>
                                <option value={'Vĩnh Long'}>Vĩnh Long</option>
                                <option value={'Vĩnh Phúc'}>Vĩnh Phúc</option>
                                <option value={'Yên Bái'}>Yên Bái</option>
                                <option value={'Phú Yên'}>Phú Yên</option>
                                <option value={'Tp.Cần Thơ'}>Tp.Cần Thơ</option>
                                <option value={'Tp.Đà Nẵng'}>Tp.Đà Nẵng</option>
                                <option value={'Tp.Hải Phòng'}>Tp.Hải Phòng</option>
                                <option value={'Tp.Hà Nội'}>Tp.Hà Nội</option>
                                <option value={'TP  HCM'}>TP HCM</option>
                            </select>
                        </div>

                        <div className='select-container'>
                            <div>
                                <label style={{ float: 'left' }}>Vai trò</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.role_alert}
                                </label>
                            </div>

                            <select name='role' onChange={(event) => { this.handleOnChangeInput(event, 'role') }} >
                                <option value={''} selected={'selected'}>--Chọn một vai trò--</option>
                                <option value={'factory'}>Nhà máy</option>
                                <option value={'agent'}>Đại lý phân phối</option>
                                <option value={'center'}>Trung tâm bảo hành</option>
                            </select>
                        </div>

                        <div className='response-container'>
                            <div style={{ color: 'red' }}>
                                {this.state.res_message}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                
                <ModalFooter>
                    <Button className='btn btn-confirm px-3' onClick={() => this.createFacilityButton()}>Mở cơ sở mới</Button>{' '}
                    <Button className=' btn btn-deny px-3' onClick={() => this.toggle()}>Hủy</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateFacility);
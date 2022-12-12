import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalCreateFacility extends Component {

    constructor(props) {
        super(props)
        this.state = {
            facility_name: '',
            phone_number: '',
            address: '',
            role: ''
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

    createFacilityButton = () => {
        if (this.checkValidInput()) {
            this.setState({
                facility_name: '',
                phone_number: '',
                address: '',
                role: ''
            })

            let data = {
                facility_name: this.state.facility_name.trim(),
                phone_number: this.state.phone_number.trim(),
                address: this.state.address.trim(),
                role: this.state.role
            }

            this.props.createFacility(data)
        }
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['facility_name', 'phone_number', 'address', 'role']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing input param: ' + arrInput[i])
                break
            }
        }
        return isValid
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.props.toggleModal()}
                size='lg'
            >
                <ModalHeader toggle={() => this.props.toggleModal()}>Modal title</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
                        <div className='input-container'>
                            <label>Facility Name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'facility_name') }}
                                value={this.state.facility_name} />
                        </div>
                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'phone_number') }}
                                value={this.state.phone_number} />
                        </div>
                        <div className='select-container'>
                            <label>Address</label>
                            <select name='address' onChange={(event) => { this.handleOnChangeInput(event, 'address') }} >
                                <option value={''}>--Thành phố--</option>
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
                            <label>Role</label>
                            <select name='role' onChange={(event) => { this.handleOnChangeInput(event, 'role') }} >
                                <option value={''}>--Choose a role--</option>
                                <option value={'factory'}>Factory</option>
                                <option value={'agent'}>Agent</option>
                                <option value={'center'}>Maintainance Center</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-confirm px-3' onClick={() => this.createFacilityButton()}>Create Facility</Button>{' '}
                    <Button className=' btn btn-deny px-3' onClick={() => this.props.toggleModal()}>Cancel</Button>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleGetCustomerByID } from '../../../services/customerService';
import { handleGetAllProductLines } from '../../../services/productService';

class ModalCreateBill extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_line: '',
            quantity: '',
            customer_id: '',
            fullname: '',
            phone_number: '',
            product_line_alert: '',
            quantity_alert: '',
            customer_id_alert: '',
            fullname_alert: '',
            phone_number_alert: '',
            res_message: '',
            customerInfo: null,
            product_lines: []
        }
    }

    async componentDidMount() {
        await this.getAllProductLines()
    }

    handleOnChangeInput = (event, field) => {
        if (field === 'customer_id') {
            this.getCustomerByID(event.target.value.trim())
        }

        let copyState = { ...this.state }
        copyState[field] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log(this.state)
        })
    }

    createBillButton = () => {
        this.setState({
            product_line_alert: '',
            quantity_alert: '',
            customer_id_alert: '',
            fullname_alert: '',
            phone_number_alert: '',
            res_message: ''
        })

        if (this.checkValidInput()) {
            let data = {
                product_line: this.state.product_line.trim(),
                quantity: this.state.quantity.trim(),
                customer_id: this.state.customer_id.trim(),
                fullname: this.state.fullname.trim().replace(/\s+/g, ' '),
                phone_number: this.state.phone_number.trim(),
            }

            console.log(data)

            let res = this.props.createBill(data)
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
        let arrInput = ['product_line', 'quantity', 'customer_id', 'fullname', 'phone_number']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                switch (arrInput[i]) {
                    case 'product_line':
                        this.setState({ product_line_alert: 'Chưa chọn dòng sản phẩm' })
                        break
                    case 'quantity':
                        this.setState({ quantity_alert: 'Chưa nhập số lượng' })
                        break
                    case 'customer_id':
                        this.setState({ customer_id_alert: 'Chưa nhập mã khách hàng' })
                        break
                    case 'fullname':
                        this.setState({ fullname_alert: 'Chưa nhập họ và tên' })
                        break
                    case 'phone_number':
                        this.setState({ phone_number_alert: 'Chưa nhập số điện thoại' })
                        break
                }
            }
        }

        if (!this.nameValidate(this.state.fullname)) {
            isValid = false
            this.setState({ fullname_alert: 'Họ và tên không đúng định dạng' })
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

    getCustomerByID = async (customer_id) => {
        let res = await handleGetCustomerByID(customer_id)

        if (res.errCode === 0) {
            let customer = res.customer
            this.setState({
                customerInfo: customer,
                fullname: customer.fullname,
                phone_number: customer.phone_number
            })
        } else {
            this.setState({
                customerInfo: null
            })
        }
    }

    getAllProductLines = async () => {
        let res = await handleGetAllProductLines()
        if (res && res.errCode === 0) {
            this.setState({
                product_lines: res.product_lines
            })
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.createBillButton()
        }
    }

    toggle = () => {
        this.setState({
            product_line: '',
            quantity: '',
            customer_id: '',
            fullname: '',
            phone_number: '',
            product_line_alert: '',
            quantity_alert: '',
            customer_id_alert: '',
            fullname_alert: '',
            phone_number_alert: '',
            res_message: ''
        })
        this.props.toggleModal()
    }

    render() {
        let product_lines = this.state.product_lines
        let good_products = this.props.good_products
        let in_stock = ''
        
        for (let i = 0; i < good_products.length; i++) {
            if (good_products[i].product_line === this.state.product_line) {
                in_stock = good_products[i].quantity
                break
            }
        }

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>Tạo hóa đơn</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
                        <div className='select-container'>
                            <div>
                                <label style={{ float: 'left' }}>Dòng sản phẩm</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.product_line_alert}
                                </label>
                            </div>

                            <select name='product_line' onChange={(event) => { this.handleOnChangeInput(event, 'product_line') }} >
                                <option value={''} selected={'selected'} >--Chọn một dòng sản phẩm--</option>
                                {
                                    product_lines.map((product_line) => {
                                        return (
                                            <option value={product_line.product_line}>{product_line.product_line}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='input-container'>
                            <div>
                                <label style={{ float: 'left' }}>Số lượng {!in_stock ? '' : '(Số lượng tồn kho: ' + in_stock + ')'}</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.quantity_alert}
                                </label>
                            </div>
                            <input type='number' min={1} value={this.state.quantity}
                                onChange={(event) => { this.handleOnChangeInput(event, 'quantity') }}
                                onKeyDown={(event) => this.handleKeyDown(event)} />
                        </div>
                        <div className='input-container'>
                            <div>
                                <label style={{ float: 'left' }}>Mã khách hàng</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.customer_id_alert}
                                </label>
                            </div>
                            <input type='text' value={this.state.customer_id}
                                onChange={(event) => { this.handleOnChangeInput(event, 'customer_id') }}
                                onKeyDown={(event) => this.handleKeyDown(event)} />
                        </div>
                        <div className='input-container'>
                            <div>
                                <label style={{ float: 'left' }}>Họ và tên</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.fullname_alert}
                                </label>
                            </div>
                            <input type='text' value={this.state.fullname}
                                onChange={(event) => { this.handleOnChangeInput(event, 'fullname') }}
                                onKeyDown={(event) => this.handleKeyDown(event)} />
                        </div>
                        <div className='input-container'>
                            <div>
                                <label style={{ float: 'left' }}>Số điện thoại</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.phone_number_alert}
                                </label>
                            </div>
                            <input type='text' value={this.state.phone_number}
                                onChange={(event) => { this.handleOnChangeInput(event, 'phone_number') }}
                                onKeyDown={(event) => this.handleKeyDown(event)} />
                        </div>
                        <div className='response-container'>
                            <div style={{ color: 'red' }}>
                                {this.state.res_message}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-confirm px-3' onClick={() => this.createBillButton()}>Tạo hóa đơn</Button>{' '}
                    <Button className='btn btn-deny px-3' onClick={() => this.toggle()}>Hủy</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateBill);
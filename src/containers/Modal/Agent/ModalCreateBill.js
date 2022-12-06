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
        if (this.checkValidInput()) {
            let data = {
                product_line: this.state.product_line.trim(),
                quantity: this.state.quantity.trim(),
                customer_id: this.state.customer_id.trim(),
                fullname: this.state.fullname.trim(),
                phone_number: this.state.phone_number.trim(),
            }

            this.setState({
                product_line: '',
                quantity: '',
                customer_id: '',
                fullname: '',
                phone_number: ''
            })

            this.props.createBill(data)
        }
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['product_line', 'quantity', 'customer_id', 'fullname', 'phone_number']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing input param: ' + arrInput[i])
                break
            }
        }
        return isValid
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

    render() {
        let product_lines = this.state.product_lines
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.props.toggleModal()}
                className={'modal-create-facility-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.props.toggleModal()}>Tạo hóa đơn</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
                        <div className='select-container'>
                            <label>Dòng sản phẩm</label>
                            <select name='product_line' onChange={(event) => { this.handleOnChangeInput(event, 'product_line') }} >
                                <option value={''}>--Chọn một dòng sản phẩm--</option>
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
                            <label>Số lượng</label>
                            <input type='number' min={1} onChange={(event) => { this.handleOnChangeInput(event, 'quantity') }}
                                value={this.state.quantity} />
                        </div>
                        <div className='input-container'>
                            <label>Mã khách hàng</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'customer_id') }}
                                value={this.state.customer_id} />
                        </div>
                        <div className='input-container'>
                            <label>Họ và tên</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'fullname') }}
                                value={this.state.fullname} />
                        </div>
                        <div className='input-container'>
                            <label>Số điện thoại</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'phone_number') }}
                                value={this.state.phone_number} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.createBillButton()}>Tạo hóa đơn</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.props.toggleModal()}>Hủy</Button>
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
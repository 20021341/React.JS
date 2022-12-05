import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleGetProductsOfCustomer, handleGetCustomerByID } from '../../services/customerService';
import { handleGetFacilititesByRole } from '../../services/facilityService';

class ModalCreateCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customer_id: '',
            fullname: '',
            phone_number: '',
            product_id: '',
            center_id: '',
            products: [],
            centers: [],
            customerInfo: null
        }
    }

    componentDidMount() {
        this.getCenters()
    }

    handleOnChangeInput = (event, field) => {
        if (field === 'customer_id') {
            this.getProductsOfCustomers(event.target.value.trim())
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

    createCardButton = () => {
        if (this.checkValidInput()) {
            let data = {
                customer_id: this.state.customer_id.trim(),
                product_id: this.state.product_id,
                center_id: this.state.center_id
            }

            this.setState({
                customer_id: '',
                fullname: '',
                phone_number: '',
                product_id: '',
                center_id: '',
                products: [],
            })

            this.props.createCard(data)
        }
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['customer_id', 'product_id', 'center_id']
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

    getCenters = async () => {
        let res = await handleGetFacilititesByRole('center')
        let centers = res.facilities
        this.setState({
            centers: centers
        })
    }

    getProductsOfCustomers = async (customer_id) => {
        let res = await handleGetProductsOfCustomer(customer_id)
        if (res.errCode === 0) {
            let products = res.products
            this.setState({
                products: products
            })
        } else {
            this.setState({
                products: []
            })
        }
    }

    render() {
        let centers = this.state.centers
        let products = this.state.products

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.props.toggleModalCreateCard()}
                className={'modal-create-facility-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.props.toggleModalCreateCard()}>Tạo thẻ bảo hành</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
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
                        <div className='select-container'>
                            <label>Mã sản phẩm</label>
                            <select name='product_id' onChange={(event) => { this.handleOnChangeInput(event, 'product_id') }} >
                                <option value={''}>--Sản phẩm đã mua--</option>
                                {
                                    products.map((product) => {
                                        return (
                                            <option value={product.product_id}>{product.product_id}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='select-container'>
                            <label>Trung tâm bảo hành</label>
                            <select name='maintain_at' onChange={(event) => { this.handleOnChangeInput(event, 'center_id') }} >
                                <option value={''}>--Chọn một trung tâm--</option>
                                {
                                    centers.map((center) => {
                                        return (
                                            <option value={center.facility_id}>{center.facility_name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.createCardButton()}>Tạo hóa đơn</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.props.toggleModalCreateCard()}>Hủy</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateCard);
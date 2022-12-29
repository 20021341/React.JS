import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleGetProductsOfCustomer, handleGetCustomerByID } from '../../../services/customerService';
import { handleGetFacilititesByRole } from '../../../services/facilityService';

class ModalCreateCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customer_id: '',
            fullname: '',
            phone_number: '',
            product_id: '',
            center_id: '',
            // những thuộc tính alert là dòng thông báo lúc nhấn nút xác nhận của từng trường dữ liệu
            customer_id_alert: '',
            product_id_alert: '',
            center_id_alert: '',
            res_messsage: '',
            products: [],
            centers: [],
            customerInfo: null
        }
    }

    componentDidMount() {
        this.getCenters()
    }

    // cập nhật lại thuộc tính khi người dùng nhập dữ liệu
    handleOnChangeInput = (event, field) => {
        if (field === 'customer_id') {
            this.getProductsOfCustomers(event.target.value.trim()) // lấy danh sách sản phẩm mà khách hàng đã mua
            this.getCustomerByID(event.target.value.trim()) // lấy thông tin của khách hàng
        }

        let copyState = { ...this.state }
        copyState[field] = event.target.value

        this.setState({
            ...copyState
        }, () => {
            console.log(this.state)
        })
    }

    // nút tạo phiếu bảo hành
    createCardButton = () => {
        // clear dữ liệu cũ
        this.setState({
            customer_id_alert: '',
            product_id_alert: '',
            center_id_alert: '',
            res_messsage: '',
        })

        if (this.checkValidInput()) {
            let data = {
                customer_id: this.state.customer_id.trim(),
                product_id: this.state.product_id,
                center_id: this.state.center_id
            }

            // truyền dữ liệu cho component quản lý sản phẩm bảo hành, lỗi để gọi api
            // sau đó nó trả về response để cập nhật res_message báo lỗi
            let res = this.props.createCard(data)

            res.then((obj) => {
                if (obj.errCode === 0) {
                    this.toggle()
                } else {
                    this.setState({ res_message: obj.message })
                }
            })
        }
    }

    // kiểm tra input hợp lệ
    checkValidInput = () => {
        let isValid = true
        let arrInput = ['customer_id', 'product_id', 'center_id']

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false

                switch (arrInput[i]) {
                    case 'customer_id':
                        this.setState({ customer_id_alert: 'Chưa nhập mã khách hàng' })
                        break
                    case 'product_id':
                        this.setState({ product_id_alert: 'Chưa chọn sản phẩm' })
                        break
                    case 'center_id':
                        this.setState({ center_id_alert: 'Chưa chọn trung tâm bảo hành' })
                        break
                }
            }
        }

        return isValid
    }

    // lấy thông tin khách hàng theo mã khách hàng
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
                customerInfo: null,
                fullname: '',
                phone_number: ''
            })
        }
    }

    // lấy danh sách trung tâm bảo hành
    getCenters = async () => {
        let res = await handleGetFacilititesByRole('center')

        let centers = res.facilities

        this.setState({
            centers: centers
        })
    }

    // lấy danh sách sản phẩm mà khách hàng đã mua
    // dùng để lựa chọn khi tạo phiếu bảo hành
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

    // nút enter
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.createCardButton()
        }
    }

    // bật/tắt modal tạo 
    toggle = () => {
        // clear dữ liệu cũ
        this.setState({
            customer_id: '',
            fullname: '',
            phone_number: '',
            product_id: '',
            center_id: '',
            customer_id_alert: '',
            product_id_alert: '',
            center_id_alert: '',
            res_messsage: '',
            products: [],
        })

        this.props.toggleModalCreateCard()
    }

    render() {
        let centers = this.state.centers
        let products = this.state.products

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>Tạo thẻ bảo hành</ModalHeader>

                <ModalBody>
                    <div className='modal-body'>
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
                            <label>Họ và tên</label>
                            <input type='text' readOnly onChange={(event) => { this.handleOnChangeInput(event, 'fullname') }}
                                value={this.state.fullname} />
                        </div>

                        <div className='input-container'>
                            <label>Số điện thoại</label>
                            <input type='text' readOnly onChange={(event) => { this.handleOnChangeInput(event, 'phone_number') }}
                                value={this.state.phone_number} />
                        </div>

                        <div className='select-container'>
                            <div>
                                <label style={{ float: 'left' }}>Mã sản phẩm</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.product_id_alert}
                                </label>
                            </div>

                            <select name='product_id' onChange={(event) => { this.handleOnChangeInput(event, 'product_id') }} >
                                <option value={''} selected={'selected'}>--Sản phẩm đã mua--</option>
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
                            <div>
                                <label style={{ float: 'left' }}>Trung tâm bảo hành</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.center_id_alert}
                                </label>
                            </div>

                            <select name='maintain_at' onChange={(event) => { this.handleOnChangeInput(event, 'center_id') }} >
                                <option value={''} selected={'selected'}>--Chọn một trung tâm--</option>
                                {
                                    centers.map((center) => {
                                        return (
                                            <option value={center.facility_id}>{center.facility_name}</option>
                                        )
                                    })
                                }
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
                    <Button className='btn btn-confirm px-3' onClick={() => this.createCardButton()}>Tạo phiếu bảo hành</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateCard);
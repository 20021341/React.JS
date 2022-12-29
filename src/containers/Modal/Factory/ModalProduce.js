import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleGetAllProductLines } from '../../../services/productService';

class ModalProduce extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_line: '',
            quantity: '',
            product_line_alert: '',
            quantity_alert: '',
            res_message: '',
            product_lines: []
        }
    }

    async componentDidMount() {
        await this.getAllProductLines()
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

    // nút sản xuất
    produceButton = () => {
        this.setState({
            product_line_alert: '',
            quantity_alert: '',
            res_message: ''
        })

        if (this.checkValidInput()) {
            let data = {
                product_line: this.state.product_line,
                quantity: this.state.quantity.trim(),
            }

            // truyền dữ liệu cho component quản lý sản phẩm tồn kho để gọi api
            // sau đó nó trả về response để cập nhật res_message báo lỗi
            let res = this.props.produce(data)

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
        let arrInput = ['product_line', 'quantity']
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
                }
            }
        }
        return isValid
    }

    // lấy danh sách dòng sản phẩm
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
            this.produceButton()
        }
    }

    toggle = () => {
        this.setState({
            product_line: '',
            quantity: '',
            product_lines_alert: '',
            quantity_alert: '',
            res_message: '',
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
                <ModalHeader toggle={() => this.toggle()}>Sản xuất sản phẩm</ModalHeader>

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
                                <option value={''} selected={'selected'}>--Chọn một dòng sản phẩm--</option>
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

                        <div className='response-container'>
                            <div style={{ color: 'red' }}>
                                {this.state.res_message}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                
                <ModalFooter>
                    <Button className='btn btn-confirm px-3' onClick={() => this.produceButton()}>Sản xuất</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduce);
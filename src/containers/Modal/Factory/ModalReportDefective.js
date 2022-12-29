import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleGetAllProductLines } from '../../../services/productService';

class ModalReportDefective extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product_line: '',
            product_line_alert: '',
            res_message: '',
            product_lines: []
        }
    }

    componentDidMount() {
        this.getAllProductLines()
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

    // nút báo cáo dòng sản phẩm lỗi
    reportDefectiveButton = () => {
        this.setState({
            product_line_alert: '',
            res_message: ''
        })

        if (this.checkValidInput()) {

            // truyền dữ liệu cho component quản lý sản phẩm lỗi để gọi api
            // sau đó nó trả về response để cập nhật res_message báo lỗi
            let res = this.props.reportDefective(this.state.product_line)

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

        if (!this.state['product_line']) {
            isValid = false
            this.setState({ product_line_alert: 'Chưa chọn dòng sản phẩm' })
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

    toggle = () => {
        this.setState({
            product_line: '',
            product_line_alert: '',
            res_message: '',
        })

        this.props.toggleModal()
    }

    render() {
        let product_lines = this.state.product_lines

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>Báo cáo dòng sản phẩm lỗi</ModalHeader>

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

                            <div className='response-container'>
                                <div style={{ color: 'red' }}>
                                    {this.state.res_message}
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                
                <ModalFooter>
                    <Button className='btn btn-confirm px-3' onClick={() => this.reportDefectiveButton()}>Báo cáo</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalReportDefective);
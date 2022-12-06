import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleGetAllProductLines } from '../../../services/productService';

class ModalReportDefective extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_line: '',
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

    reportDefectiveButton = () => {
        if (this.checkValidInput()) {
            this.props.reportDefective(this.state.product_line)

            this.setState({
                product_line: '',
            })
        }
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['product_line']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing input param: ' + arrInput[i])
                break
            }
        }
        return isValid
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
                <ModalHeader toggle={() => this.props.toggleModal()}>Báo cáo dòng sản phẩm lỗi</ModalHeader>
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
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.reportDefectiveButton()}>Báo cáo</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalReportDefective);
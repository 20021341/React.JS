import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleGetFacilititesByRole } from '../../../services/facilityService';
import { handleGetAllProductLines } from '../../../services/productService';

class ModalDeliverGoodProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_line: '',
            agent_id: '',
            quantity: '',
            product_lines: [],
            agents: []
        }
    }

    async componentDidMount() {
        await this.getAllAgents()
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

    deliverButton = () => {
        if (this.checkValidInput()) {
            let data = {
                product_line: this.state.product_line,
                agent_id: this.state.agent_id,
                quantity: this.state.quantity.trim(),
            }

            this.setState({
                product_line: '',
                agent_id: '',
                quantity: '',
            })

            this.props.deliverGoodProducts(data)
        }
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['product_line', 'agent_id', 'quantity']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing input param: ' + arrInput[i])
                break
            }
        }
        return isValid
    }

    getAllAgents = async () => {
        let res = await handleGetFacilititesByRole('agent')
        if (res && res.errCode === 0) {
            this.setState({
                agents: res.facilities
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
        let agents = this.state.agents
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
                        <div className='select-container'>
                            <label>Đại lý phân phối</label>
                            <select name='agent_id' onChange={(event) => { this.handleOnChangeInput(event, 'agent_id') }} >
                                <option value={''}>--Chọn một đại lý--</option>
                                {
                                    agents.map((agent) => {
                                        return (
                                            <option value={agent.facility_id}>{agent.facility_name}</option>
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
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-confirm px-3' onClick={() => this.deliverButton()}>Vận chuyển</Button>{' '}
                    <Button className='btn btn-deny px-3' onClick={() => this.props.toggleModal()}>Hủy</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeliverGoodProduct);
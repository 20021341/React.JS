import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleGetFacilititesByRole } from '../../../services/facilityService'

class ModalDeliverDefectiveProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            center_id: '',
            center_id_alert: '',
            res_message: '',
            centers: []
        }
    }

    componentDidMount() {
        this.getCenters()
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

    deliverDefectiveButton = async () => {
        this.setState({
            center_id_alert: '',
            res_message: ''
        })

        if (this.checkValidInput()) {
            let res = await this.props.deliverDefectiveProducts(this.state.center_id)

            if (res.errCode === 0) {
                this.toggle()
            } else {
                this.setState({ res_message: res.message })
            }
        }
    }

    checkValidInput = () => {
        let isValid = true
        if (!this.state['center_id']) {
            isValid = false
            this.setState({ center_id_alert: 'Chưa chọn trung tâm bảo hành' })
        }
        return isValid
    }

    getCenters = async () => {
        let res = await handleGetFacilititesByRole('center')
        let centers = res.facilities
        this.setState({
            centers: centers
        })
    }

    toggle = () => {
        this.setState({
            center_id: '',
            center_id_alert: '',
            res_message: ''
        })

        this.props.toggleModalDefective()
    }

    render() {
        let centers = this.state.centers

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>Vận chuyển sản phẩm lỗi</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
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
                    <Button className='btn btn-confirm px-3' onClick={() => this.deliverDefectiveButton()}>Vận chuyển sản phẩm</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeliverDefectiveProduct);
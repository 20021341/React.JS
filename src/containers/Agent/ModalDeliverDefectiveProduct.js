import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleGetFacilititesByRole } from '../../services/facilityService'

class ModalDeliverDefectiveProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            center_id: '',
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

    deliverDefectiveButton = () => {
        if (this.checkValidInput()) {
            this.props.deliverDefectiveProducts(this.state.center_id)
        }
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['center_id']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing input param: ' + arrInput[i])
                break
            }
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

    render() {
        let centers = this.state.centers

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.props.toggleModalDefective()}
                className={'modal-create-facility-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.props.toggleModalDefective()}>Vận chuyển sản phẩm lỗi</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
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
                    <Button color="primary" className='px-3' onClick={() => this.deliverDefectiveButton()}>Vận chuyển sản phẩm</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.props.toggleModalDefective()}>Hủy</Button>
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
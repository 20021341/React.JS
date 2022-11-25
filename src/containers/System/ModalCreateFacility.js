import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ModalCreateFacility.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalCreateFacility extends Component {

    constructor(props) {
        super(props)
        this.state = {
            facility_name: '',
            phone_number: '',
            address: '',
            role: ''
        }
    }

    componentDidMount() {
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

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.props.toggleModal()}
                className={'modal-create-facility-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.props.toggleModal()}>Modal title</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
                        <div className='input-container'>
                            <label>Facility Name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'facility_name') }} />
                        </div>
                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'phone_number') }} />
                        </div>
                        <div className='input-container'>
                            <label>Address</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'address') }} />
                        </div>
                        <div className='select-container'>
                            <label>Role</label>
                            <select name='role' onChange={(event) => { this.handleOnChangeInput(event, 'role') }} >
                                <option value={''}>--Choose a role--</option>
                                <option value={'factory'}>Factory</option>
                                <option value={'agent'}>Agent</option>
                                <option value={'center'}>Maintainance Center</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.props.toggleModal()}>Do Something</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.props.toggleModal()}>Cancel</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateFacility);
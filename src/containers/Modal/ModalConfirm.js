import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalConfirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.props.toggleModalConfirm()}
                className={'modal-create-facility-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.props.toggleModalConfirm()}>Xác nhận</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
                        {this.props.message}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.props.onConfirm()}>Đồng ý</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.props.toggleModalConfirm()}>Hủy</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);
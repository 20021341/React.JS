import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalConfirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            res_message: ''
        }
    }

    componentDidMount() {
    }

    confirmButton = async () => {
        this.setState({
            res_message: ''
        })

        let res = await this.props.onConfirm()
        if (!res || res.errCode === 0) {
            this.toggle()
        } else {
            this.setState({ res_message: res.message })
        }
    }

    toggle = () => {
        this.setState({
            res_message: ''
        })

        this.props.toggleModalConfirm()
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>Xác nhận</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
                        <h5 className='confirm-question'>{this.props.message}</h5>
                        <div className='response-container'>
                            <div style={{ color: 'red' }}>
                                {this.state.res_message}
                            </div>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button className='btn btn-confirm px-3' onClick={() => this.confirmButton()}>Đồng ý</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);
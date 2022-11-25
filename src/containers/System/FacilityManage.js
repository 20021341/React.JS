import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { handleGetAllFacilities } from '../../services/userService'
import ModalCreateFacility from './ModalCreateFacility';

class FacilityManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            facilities: [],
            is_modal_open: false
        }
    }

    async componentDidMount() {
        let data = await handleGetAllFacilities()
        if (data && data.errCode === 0) {
            this.setState({
                facilities: data.facilities
            })
        }
    }

    handleCreateFacility = () => {
        this.setState({
            is_modal_open: true
        })
    }

    toggleModal = () => {
        this.setState({
            is_modal_open: !this.state.is_modal_open
        })
    }

    render() {
        let facilities = this.state.facilities

        return (
            <div className='facility-container'>
                <div className='title text-center'>Facilities</div>
                <ModalCreateFacility
                    isOpen={this.state.is_modal_open}
                    toggleModal={this.toggleModal}
                />
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleCreateFacility()}>
                        <i className='fas fa-plus'></i> Create a new facility
                    </button>
                </div>
                <div className='facility-table mx-1 mt-3'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Phone number</th>
                                <th scope="col">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                facilities.map((facility) => {
                                    return (
                                        <tr>
                                            <td>{facility.facility_id}</td>
                                            <td>{facility.facility_name}</td>
                                            <td>{facility.address}</td>
                                            <td>{facility.phone_number}</td>
                                            <td>{facility.role}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(FacilityManage);

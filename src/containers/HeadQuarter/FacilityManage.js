import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetAllFacilities, handleCreateFacility } from '../../services/facilityService'
import ModalCreateFacility from '../Modal/HeadQuarter/ModalCreateFacility';

class FacilityManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            facilities: [],
            is_modal_open: false
        }
    }

    async componentDidMount() {
        await this.getAllFacilities()
    }

    getAllFacilities = async () => {
        let data = await handleGetAllFacilities()
        if (data && data.errCode === 0) {
            this.setState({
                facilities: data.facilities
            })
        }
    }

    createFacility = async (data) => {
        try {
            let res = await handleCreateFacility(data)
            if (res && res.errCode === 0) {
                alert(res.message)
                await this.getAllFacilities()
                this.toggleModal()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleCreateFacilityButton = () => {
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
                    createFacility={this.createFacility}
                />
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleCreateFacilityButton()}>
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
        isLoggedIn: state.user.isLoggedIn,
        facility: state.user.facility,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacilityManage);

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

    // lấy danh sách toàn bộ cơ sở
    getAllFacilities = async () => {
        let data = await handleGetAllFacilities()

        if (data && data.errCode === 0) {
            this.setState({
                facilities: data.facilities
            })
        }
    }

    // tạo một cơ sở mới, lấy dữ liệu từ modal
    createFacility = async (data) => {
        let res = await handleCreateFacility(data)

        await this.getAllFacilities()

        return res
    }

    // nút tạo cơ sở
    createFacilityButton = () => {
        this.setState({
            is_modal_open: true
        })
    }

    // bật/tắt modal tạo cơ sở
    toggleModal = () => {
        this.setState({
            is_modal_open: !this.state.is_modal_open
        })
    }

    render() {
        let facilities = this.state.facilities

        return (
            <div className='content'>
                <div className='title'>Quản lý cơ sở</div>

                {/* modal tạo cơ sở */}
                <ModalCreateFacility
                    isOpen={this.state.is_modal_open}
                    toggleModal={this.toggleModal}
                    createFacility={this.createFacility}
                />

                <button className='btn btn-red'
                    onClick={() => this.createFacilityButton()}>
                    Mở cơ sở mới
                </button>

                <div className='table-container mt-3'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Mã cơ sở</th>
                                <th scope="col">Tên cơ sở</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Vai trò</th>
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

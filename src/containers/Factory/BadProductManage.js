import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleRecycleProducts, handleRepairProducts, handleReportDefective } from '../../services/factoryService';
import { handleGetBadProducts } from '../../services/siteService';
import ModalConfirm from '../Modal/ModalConfirm'
import ModalReportDefective from '../Modal/Factory/ModalReportDefective';

class BadProductManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            badProducts: [],
            is_modal_recycle_open: false,
            is_modal_repair_open: false,
            is_modal_report_open: false,
        }
    }

    async componentDidMount() {
        await this.getBadProducts()
    }

    // lấy danh sách sản phẩm đang tồn kho nhà máy mà được phát hiện ra là bị lỗi
    // và những sản phẩm mà không thể sửa chữa được chuyển từ trung tâm bảo hành về
    // hoặc được sửa tại nhà máy nhưng không sửa được
    getBadProducts = async () => {
        const { facility } = this.props

        // gọi api, truyền vào id của nhà máy này
        let data = await handleGetBadProducts(facility.facility_id)

        if (data) {
            if (data.errCode === 0) { // lấy danh sách thành công
                this.setState({
                    badProducts: data.products
                })
            } else if (data.errCode === 2) { // không có sản phẩm lỗi nào
                this.setState({
                    badProducts: []
                })
            }
        }
    }

    // tái chế những sản phẩm bị hỏng không sửa được
    recyleProducts = async () => {
        const { facility } = this.props

        let res = await handleRecycleProducts({ factory_id: facility.facility_id })

        await this.getBadProducts()

        return res
    }

    // sửa chữa tất cả các sản phẩm mà bị lỗi
    repairProducts = async () => {
        const { facility } = this.props

        let res = await handleRepairProducts({ factory_id: facility.facility_id })

        await this.getBadProducts()

        return res
    }

    // báo cáo một dòng sản phẩm sản xuất tại nhà máy này mà bị lỗi
    // chỉ những sản phẩm đã từng được sản xuất ở nhà máy này và chưa từng được đem đi bảo hành (bất kể là bảo hành thành công hay không) mới được tính vào
    // những sản phẩm thuộc dòng sản phẩm này sau đó được sản xuất mới sẽ không bị gán là bị lỗi
    reportDefective = async (product_line) => {
        const { facility } = this.props

        let data = {
            product_line: product_line,
            factory_id: facility.facility_id
        }

        let res = await handleReportDefective(data)
        
        await this.getBadProducts()

        return res
    }

    // bấm nút tái chế sản phẩm
    recycleButton = () => {
        this.setState({
            is_modal_recycle_open: true
        })
    }

    // bấm nút sửa chữa sản phẩm
    repairButton = () => {
        this.setState({
            is_modal_repair_open: true
        })
    }

    // bấm nút báo cáo dòng sản phẩm lỗi
    reportButton = () => {
        this.setState({
            is_modal_report_open: true
        })
    }

    // bật/tắt modal tái chế
    toggleModalRecycle = () => {
        this.setState({
            is_modal_recycle_open: !this.state.is_modal_recycle_open
        })
    }

    // bật/tắt modal sửa chữa
    toggleModalRepair = () => {
        this.setState({
            is_modal_repair_open: !this.state.is_modal_repair_open
        })
    }

    // bật/tắt modal báo cáo
    toggleModalReport = () => {
        this.setState({
            is_modal_report_open: !this.state.is_modal_report_open
        })
    }

    render() {
        let badProducts = this.state.badProducts

        return (
            <div className='content'>
                <div className='title'>Quản lý sản phẩm lỗi</div>

                {/* modal xác nhận tái chế sản phẩm hỏng */}
                <ModalConfirm
                    isOpen={this.state.is_modal_recycle_open}
                    toggleModalConfirm={this.toggleModalRecycle}
                    onConfirm={this.recyleProducts}
                    message={'Tái chế các sản phẩm hỏng?'}
                />

                {/* modal xác nhận sửa chữa sản phẩm lỗi */}
                <ModalConfirm
                    isOpen={this.state.is_modal_repair_open}
                    toggleModalConfirm={this.toggleModalRepair}
                    onConfirm={this.repairProducts}
                    message={'Sửa chữa các sản phẩm lỗi?'}
                />

                {/* modal báo cáo dòng sản phẩm lỗi */}
                <ModalReportDefective
                    isOpen={this.state.is_modal_report_open}
                    toggleModal={this.toggleModalReport}
                    reportDefective={this.reportDefective}
                />

                <button className='btn btn-red'
                    onClick={() => this.recycleButton()}>
                    Tái chế sản phẩm hỏng
                </button>

                <button className='btn btn-brown'
                    onClick={() => this.repairButton()}>
                    Sửa chữa sản phẩm lỗi
                </button>

                <button className='btn btn-yellow'
                    onClick={() => this.reportButton()}>
                    Báo cáo dòng sản phẩm lỗi
                </button>

                <div className='table-container mt-3'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Mã sản phẩm</th>
                                <th scope="col">Mã khách hàng</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                badProducts.map((product) => {
                                    return (
                                        <tr>
                                            <td>{product.product_id}</td>
                                            <td>{product.owner ? product.owner : 'Sản phẩm chưa có người mua'}</td>
                                            <td>{product.status}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(BadProductManage);
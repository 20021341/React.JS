import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalConfirm from '../Modal/ModalConfirm'
import { handleDeliverBrokenProducts, handleRepairProducts } from '../../services/centerService';
import { handleGetBadProducts } from '../../services/siteService';

class BadProductManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bad_products: [],
            is_modal_repair_open: false,
            is_modal_deliver_open: false,
        }
    }

    async componentDidMount() {
        await this.getBadProducts()
    }

    // lấy danh sách sản phẩm được đại lý chuyển đến để bảo hành hay sửa chữa
    // có thể bao gồm sản phẩm do khách hàng chủ động bảo hành 
    // hoặc sản phẩm bị lỗi do nhà máy báo cáo
    getBadProducts = async () => {
        const { facility } = this.props

        // gọi api, truyền vào id của trung tâm bảo hành này
        let data = await handleGetBadProducts(facility.facility_id)

        if (data) {
            if (data.errCode === 0) { // lấy thành công danh sách
                this.setState({
                    bad_products: data.products
                })
            } else if (data.errCode === 2) { //không có sản phẩm lỗi nào
                this.setState({
                    bad_products: []
                })
            }
        }
    }

    // sửa chữa toàn bộ sản phẩm trong danh sách, cập nhật lại trạng thái của sản phẩm
    // đối với sản phẩm của khách hàng thì cập nhật lại trạng thái của phiếu bảo hành
    // còn sản phẩm lỗi do nhà máy báo thì xóa phiếu bảo hành giả
    // sản phẩm có xác suất bị hỏng, nếu bị hỏng không sửa được thì sẽ ở lại trung tâm bảo hành chờ để chuyển về nơi sản xuất
    // nếu sửa được thì lập tức được chuyển về đại lý nơi mà tạo phiếu bảo hành
    repairProducts = async () => {
        const { facility } = this.props

        let res = await handleRepairProducts({ center_id: facility.facility_id })

        this.getBadProducts()

        return res
    }

    // vận chuyển sản phẩm bị hỏng đến nơi sản xuất
    deliverBrokenProducts = async () => {
        const { facility } = this.props

        let res = await handleDeliverBrokenProducts({ center_id: facility.facility_id })

        this.getBadProducts()

        return res
    }

    // bấm nút sửa chữa
    repairButton = () => {
        this.setState({
            is_modal_repair_open: true
        })
    }

    // bật/tắt modal sửa sản phẩm
    toggleModalRepair = () => {
        this.setState({
            is_modal_repair_open: !this.state.is_modal_repair_open
        })
    }

    // nút vận chuyển sản phẩm về nơi sản xuất
    deliverButton = () => {
        this.setState({
            is_modal_deliver_open: true
        })
    }

    // bật/tắt modal vận chuyển
    toggleModalDeliver = () => {
        this.setState({
            is_modal_deliver_open: !this.state.is_modal_deliver_open
        })
    }

    render() {
        let bad_products = this.state.bad_products

        return (
            <div className='content'>
                <div className='title'>Quản lý sản phẩm cần bảo hành</div>

                {/* modal xác nhận sửa chữa sản phẩm */}
                <ModalConfirm
                    isOpen={this.state.is_modal_repair_open}
                    toggleModalConfirm={this.toggleModalRepair}
                    onConfirm={this.repairProducts}
                    message={'Sửa chữa sản phẩm?'}
                />

                {/* modal xác nhận vận chuyển sản phẩm */}
                <ModalConfirm
                    isOpen={this.state.is_modal_deliver_open}
                    toggleModalConfirm={this.toggleModalDeliver}
                    onConfirm={this.deliverBrokenProducts}
                    message={'Vận chuyển sản phẩm hỏng?'}
                />

                <button className='btn btn-red'
                    onClick={() => this.repairButton()}>
                    Sửa chữa sản phẩm
                </button>

                <button className='btn btn-brown'
                    onClick={() => this.deliverButton()}>
                    Vận chuyển sản phẩm hỏng
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
                                bad_products.map((product) => {
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
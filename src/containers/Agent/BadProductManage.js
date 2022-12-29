import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalCreateCard from '../Modal/Agent/ModalCreateCard';
import ModalConfirm from '../Modal/ModalConfirm'
import ModalDeliverDefectiveProduct from '../Modal/Agent/ModalDeliverDefectiveProduct';
import { handleCreateCard, handleDeliverCustomerProducts, handleDeliverDefectiveProducts } from '../../services/agentService'
import { handleGetBadProducts } from '../../services/siteService';

class BadProductManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bad_products: [],
            is_modal_card_open: false,
            is_modal_confirm_open: false,
            is_modal_defective_open: false,
        }
    }

    async componentDidMount() {
        await this.getBadProducts()
    }


    // lấy sản phẩm lỗi trong kho đại lý (có thể là sản phẩm do khách hàng mang đi bảo hành
    // hoặc sản phẩm tồn kho được nhà máy báo là bị lỗi)
    getBadProducts = async () => {
        const { facility } = this.props

        // gọi api, truyền vào id của đại lý này
        let data = await handleGetBadProducts(facility.facility_id)

        if (data) {
            if (data.errCode === 0) { // lấy thành công, không có lỗi xảy ra
                this.setState({
                    bad_products: data.products
                })
            } else if (data.errCode === 2) {
                //không có sản phẩm lỗi nào
                this.setState({
                    bad_products: []
                })
            }
        }
    }

    // tạo phiếu bảo hành
    createCard = async (data) => {
        const { facility } = this.props
        let card = {
            // data được truyền từ modal
            customer_id: data.customer_id,
            product_id: data.product_id,
            agent_id: facility.facility_id,
            center_id: data.center_id,
        }

        // gửi data cho backend
        let res = await handleCreateCard(card)
        // lấy lại danh sách mới để cập nhật DOM
        this.getBadProducts()
        // trả về response cho modal
        return res
    }

    // vận chuyển sản phẩm mà khách hàng đem đi bảo hành, 
    // chuyển đến trung tâm bảo hành được chọn trong phiếu bảo hành
    deliverCustomerProducts = async () => {
        const { facility } = this.props

        // gửi data đến backend
        let res = await handleDeliverCustomerProducts({ agent_id: facility.facility_id })
        // lấy lại danh sách mới để cập nhật DOM
        this.getBadProducts()
        // trả về response cho modal
        return res
    }

    // vận chuyển sản phẩm mà bị lỗi do nhà máy báo, 
    // những sản phẩm này sẽ được tạo một phiếu bảo hành giả cho từng sản phẩm để đưa đến trung tâm bảo hành được chọn
    // sau khi sửa chữa thì phiếu này sẽ bị xóa
    deliverDefectiveProducts = async (center_id) => {
        const { facility } = this.props


        let data = {
            agent_id: facility.facility_id,
            center_id: center_id // id của trung tâm bảo hành được chọn ở modal
        }

        // gửi data đến backend
        let res = await handleDeliverDefectiveProducts(data)
        // lấy lại danh sách để cập nhật lại DOM
        this.getBadProducts()
        // trả về response cho modal
        return res
    }

    // xử lí sự kiện bấm nút tạo phiếu bảo hành, bật modal
    createCardButton = () => {
        this.setState({
            is_modal_card_open: true
        })
    }

    // xử lí sự kiện bấm nút vận chuyển sản phẩm bảo hành của khách hàng, bật modal
    deliverCustomerProductsButton = () => {
        this.setState({
            is_modal_confirm_open: true
        })
    }

    // xử lí sự kiện bấm nút vận chuyển sản phẩm lỗi, bật modal
    deliverDefectiveProductsButton = () => {
        this.setState({
            is_modal_defective_open: true
        })
    }

    // bật/tắt modal tạo phiếu bảo hành
    toggleModalCreateCard = () => {
        this.setState({
            is_modal_card_open: !this.state.is_modal_card_open
        })
    }

    // bật/tắt modal xác nhận vận chuyển sản phẩm bảo hành
    toggleModalConfirm = () => {
        this.setState({
            is_modal_confirm_open: !this.state.is_modal_confirm_open
        })
    }

    // bật/tắt modal vận chuyển sản phẩm lỗi
    toggleModalDefective = () => {
        this.setState({
            is_modal_defective_open: !this.state.is_modal_defective_open
        })
    }

    // hàm render DOM
    render() {
        let bad_products = this.state.bad_products

        return (
            <div className='content'>
                <div className='title'>Quản lý sản phẩm cần bảo hành/lỗi</div>

                {/* modal tạo phiếu bảo hành */}
                <ModalCreateCard
                    isOpen={this.state.is_modal_card_open}
                    toggleModalCreateCard={this.toggleModalCreateCard}
                    createCard={this.createCard}
                />

                {/* modal xác nhận vận chuyển sản phẩm bảo hành của khách hàng */}
                <ModalConfirm
                    isOpen={this.state.is_modal_confirm_open}
                    toggleModalConfirm={this.toggleModalConfirm}
                    onConfirm={this.deliverCustomerProducts}
                    message={'Vận chuyển sản phẩm cần bảo hành?'}
                />

                {/* modal vận chuyển sản phẩm lỗi */}
                <ModalDeliverDefectiveProduct
                    isOpen={this.state.is_modal_defective_open}
                    toggleModalDefective={this.toggleModalDefective}
                    deliverDefectiveProducts={this.deliverDefectiveProducts}
                />

                <button className='btn btn-red'
                    onClick={() => this.createCardButton()}>
                    Tạo phiếu bảo hành
                </button>

                <button className='btn btn-brown'
                    onClick={() => this.deliverCustomerProductsButton()}>
                    Vận chuyển sản phẩm bảo hành
                </button>

                <button className='btn btn-yellow'
                    onClick={() => this.deliverDefectiveProductsButton()}>
                    Vận chuyển sản phẩm lỗi
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

// lấy thuộc tính của component cha
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
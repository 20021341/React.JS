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
            badProducts: [],
            is_modal_card_open: false,
            is_modal_confirm_open: false,
            is_modal_defective_open: false,
        }
    }

    async componentDidMount() {
        await this.getBadProducts()
    }

    getBadProducts = async () => {
        const { facility } = this.props
        let data = await handleGetBadProducts(facility.facility_id)
        console.log(data)
        if (data) {
            if (data.errCode === 0) {
                this.setState({
                    badProducts: data.products
                })
            } else if (data.errCode === 2) {
                //không có sản phẩm xấu nào
                this.setState({
                    badProducts: []
                })
            }
        }
    }

    createCard = async (data) => {
        const { facility } = this.props
        let card = {
            customer_id: data.customer_id,
            product_id: data.product_id,
            agent_id: facility.facility_id,
            center_id: data.center_id,
        }

        let res = await handleCreateCard(card)
        this.getBadProducts()
        return res
    }

    deliverCustomerProducts = async () => {
        const { facility } = this.props

        let res = await handleDeliverCustomerProducts({ agent_id: facility.facility_id })
        this.getBadProducts()
        return res
    }

    deliverDefectiveProducts = async (center_id) => {
        const { facility } = this.props

        let data = {
            agent_id: facility.facility_id,
            center_id: center_id
        }

        let res = await handleDeliverDefectiveProducts(data)
        this.getBadProducts()
        return res
    }

    createCardButton = () => {
        this.setState({
            is_modal_card_open: true
        })
    }

    deliverCustomerProductsButton = () => {
        this.setState({
            is_modal_confirm_open: true
        })
    }

    deliverDefectiveProductsButton = () => {
        this.setState({
            is_modal_defective_open: true
        })
    }

    toggleModalCreateCard = () => {
        this.setState({
            is_modal_card_open: !this.state.is_modal_card_open
        })
    }

    toggleModalConfirm = () => {
        this.setState({
            is_modal_confirm_open: !this.state.is_modal_confirm_open
        })
    }

    toggleModalDefective = () => {
        this.setState({
            is_modal_defective_open: !this.state.is_modal_defective_open
        })
    }

    render() {
        let badProducts = this.state.badProducts

        return (
            <div className='content'>
                <div className='title'>Quản lý sản phẩm cần bảo hành/lỗi</div>
                <ModalCreateCard
                    isOpen={this.state.is_modal_card_open}
                    toggleModalCreateCard={this.toggleModalCreateCard}
                    createCard={this.createCard}
                />
                <ModalConfirm
                    isOpen={this.state.is_modal_confirm_open}
                    toggleModalConfirm={this.toggleModalConfirm}
                    onConfirm={this.deliverCustomerProducts}
                    message={'Vận chuyển sản phẩm cần bảo hành?'}
                />
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
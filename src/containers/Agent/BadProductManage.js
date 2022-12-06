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
        if (data && data.errCode === 0) {
            this.setState({
                badProducts: data.products
            })
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

        console.log(card)

        try {
            let res = await handleCreateCard(card)
            console.log(res)
            if (res && res.errCode === 0) {
                await this.getBadProducts()
                this.toggleModalCreateCard()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    deliverCustomerProducts = async () => {
        const { facility } = this.props

        try {
            let res = await handleDeliverCustomerProducts({ agent_id: facility.facility_id })
            console.log(res)
            if (res && res.errCode === 0) {
                await this.getBadProducts()
                this.toggleModalConfirm()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    deliverDefectiveProducts = async (center_id) => {
        const { facility } = this.props

        let data = {
            agent_id: facility.facility_id,
            center_id: center_id
        }

        try {
            let res = await handleDeliverDefectiveProducts(data)
            console.log(res)
            if (res && res.errCode === 0) {
                await this.getBadProducts()
                this.toggleModalDefective()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
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
            <div className='product-container'>
                <div className='title text-center'>Bad Products</div>
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
                <div className='mx-1'>
                    <button className='btn btn-primary px-3 d-inline-flex'
                        onClick={() => this.createCardButton()}>
                        <i className='fa-solid fa-cart-shopping'></i>Tạo thẻ bảo hành
                    </button>
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3 d-inline-flex'
                        onClick={() => this.deliverCustomerProductsButton()}>
                        <i className='fa-solid fa-cart-shopping'></i>Vận chuyển sản phẩm bảo hành
                    </button>
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3 d-inline-flex'
                        onClick={() => this.deliverDefectiveProductsButton()}>
                        <i className='fa-solid fa-cart-shopping'></i>Vận chuyển sản phẩm lỗi
                    </button>
                </div>
                <div className='product-table mx-1 mt-3'>
                    <table className="table table-striped">
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
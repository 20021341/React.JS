import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalCreateCard from './ModalCreateCard';
import { handleGetBadProducts, handleCreateCard } from '../../services/agentService'

class GoodProductManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            badProducts: [],
            is_modal_open: false
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
                alert(res.message)
                await this.getBadProducts()
                this.toggleModal()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    createCardButton = () => {
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
        let badProducts = this.state.badProducts

        return (
            <div className='product-container'>
                <div className='title text-center'>Bad Products</div>
                <ModalCreateCard
                    isOpen={this.state.is_modal_open}
                    toggleModal={this.toggleModal}
                    createCard={this.createCard}
                />
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.createCardButton()}>
                        <i className='fa-solid fa-cart-shopping'></i>Tạo thẻ bảo hành
                    </button>
                </div>
                <div className='product-table mx-1 mt-3'>
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

export default connect(mapStateToProps, mapDispatchToProps)(GoodProductManage);
import { delay } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetGoodProducts } from '../../services/agentService'
import { handleDeliverProducts, handleProduceProducts } from '../../services/factoryService';
import ModalDeliverGoodProduct from './ModalDeliverGoodProduct';
import ModalProduce from './ModalProduce';

class GoodProductManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            goodProducts: [],
            is_modal_produce_open: false,
            is_modal_deliver_open: false
        }
    }

    async componentDidMount() {
        await this.getGoodProducts()
    }

    getGoodProducts = async () => {
        const { facility } = this.props
        let data = await handleGetGoodProducts(facility.facility_id)
        if (data && data.errCode === 0) {
            this.setState({
                goodProducts: data.products
            })
        }
    }

    produce = async (data) => {
        const { facility } = this.props
        let info = {
            factory_id: facility.facility_id,
            product_line: data.product_line,
            quantity: data.quantity,
        }

        try {
            let res = await handleProduceProducts(info)
            if (res && res.errCode === 0) {
                await this.getGoodProducts()
                this.toggleModalProduce()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    deliverGoodProducts = async (data) => {
        const { facility } = this.props
        let info = {
            factory_id: facility.facility_id,
            product_line: data.product_line,
            agent_id: data.agent_id,
            quantity: data.quantity,
        }

        try {
            let res = await handleDeliverProducts(info)
            if (res && res.errCode === 0) {
                await this.getGoodProducts()
                this.toggleModalDeliver()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    produceButton = () => {
        this.setState({
            is_modal_produce_open: true
        })
    }

    toggleModalProduce = () => {
        this.setState({
            is_modal_produce_open: !this.state.is_modal_produce_open
        })
    }

    deliverButton = () => {
        this.setState({
            is_modal_deliver_open: true
        })
    }

    toggleModalDeliver = () => {
        this.setState({
            is_modal_deliver_open: !this.state.is_modal_deliver_open
        })
    }


    render() {
        let goodProducts = this.state.goodProducts

        return (
            <div className='product-container'>
                <div className='title text-center'>Good Products</div>
                <ModalProduce
                    isOpen={this.state.is_modal_produce_open}
                    toggleModal={this.toggleModalProduce}
                    produce={this.produce}
                />
                <ModalDeliverGoodProduct
                    isOpen={this.state.is_modal_deliver_open}
                    toggleModal={this.toggleModalDeliver}
                    deliverGoodProducts={this.deliverGoodProducts}
                />
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.produceButton()}>
                        <i className='fa-solid fa-cart-shopping'></i>Sản xuất
                    </button>
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.deliverButton()}>
                        <i className='fa-solid fa-cart-shopping'></i>Vận chuyển
                    </button>
                </div>
                <div className='product-table mx-1 mt-3'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Dòng sản phẩm</th>
                                <th scope="col">Số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                goodProducts.map((productLine) => {
                                    return (
                                        <tr>
                                            <td>{productLine.product_line}</td>
                                            <td>{productLine.quantity}</td>
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

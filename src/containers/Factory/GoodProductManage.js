import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleDeliverProducts, handleProduceProducts } from '../../services/factoryService';
import { handleGetGoodProducts } from '../../services/siteService';
import ModalDeliverGoodProduct from '../Modal/Factory/ModalDeliverGoodProduct';
import ModalProduce from '../Modal/Factory/ModalProduce';

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

        let res = await handleProduceProducts(info)
        await this.getGoodProducts()
        return res
    }

    deliverGoodProducts = async (data) => {
        const { facility } = this.props
        let info = {
            factory_id: facility.facility_id,
            product_line: data.product_line,
            agent_id: data.agent_id,
            quantity: data.quantity,
        }

        let res = await handleDeliverProducts(info)
        await this.getGoodProducts()
        return res
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
            <div className='content'>
                <div className='title text-center'>Sản phẩm tốt</div>
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

                <button className='btn btn-add'
                    onClick={() => this.produceButton()}>
                    Sản xuất
                </button>

                <button className='btn btn-modify'
                    onClick={() => this.deliverButton()}>
                    Vận chuyển
                </button>

                <div className='mx-1 mt-3'>
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

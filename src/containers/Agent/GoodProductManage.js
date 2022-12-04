import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetGoodProducts, handleCreateBill } from '../../services/agentService'
import ModalCreateBill from './ModalCreateBill';

class GoodProductManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            goodProducts: [],
            is_modal_open: false
        }
    }

    async componentDidMount() {
        await this.getGoodProducts()
    }

    getGoodProducts = async () => {
        const { facility } = this.props
        let data = await handleGetGoodProducts(facility.facility_id)
        if (data && data.errCode === 0) {
            console.log(data.products)
            this.setState({
                goodProducts: data.products
            })
        }
    }

    createBill = async (data) => {
        const { facility } = this.props
        let bill = {
            product_line: data.product_line,
            quantity: data.quantity,
            agent_id: facility.facility_id,
            customer_id: data.customer_id,
            fullname: data.fullname,
            phone_number: data.phone_number
        }

        try {
            let res = await handleCreateBill(bill)
            console.log(res)
            if (res && res.errCode === 0) {
                alert(res.message)
                await this.getGoodProducts()
                this.toggleModal()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    createBillButton = () => {
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
        let goodProducts = this.state.goodProducts

        return (
            <div className='product-container'>
                <div className='title text-center'>Good Products</div>
                <ModalCreateBill
                    isOpen={this.state.is_modal_open}
                    toggleModal={this.toggleModal}
                    createBill={this.createBill}
                />
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.createBillButton()}>
                        <i className='fa-solid fa-cart-shopping'></i>Tạo hóa đơn
                    </button>
                </div>
                <div className='product-table mx-1 mt-3'>
                    <table className="table">
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

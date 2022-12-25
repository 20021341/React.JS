import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCreateBill } from '../../services/agentService'
import { handleGetGoodProducts } from '../../services/siteService';
import ModalCreateBill from '../Modal/Agent/ModalCreateBill';

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

        let res = await handleCreateBill(bill)
        await this.getGoodProducts()
        return res
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
            <div className='content'>
                <div className='title text-center'>Sản phẩm tốt</div>
                <ModalCreateBill
                    isOpen={this.state.is_modal_open}
                    toggleModal={this.toggleModal}
                    createBill={this.createBill}
                />
                <button className='btn btn-add'
                    onClick={() => this.createBillButton()}>
                    Tạo hóa đơn
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalConfirm from '../Modal/ModalConfirm'
import { handleDeliverBrokenProducts, handleRepairProducts } from '../../services/centerService';
import { handleGetBadProducts } from '../../services/siteService';

class BadProductManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            badProducts: [],
            is_modal_repair_open: false,
            is_modal_deliver_open: false,
        }
    }

    async componentDidMount() {
        await this.getBadProducts()
    }

    getBadProducts = async () => {
        const { facility } = this.props
        let data = await handleGetBadProducts(facility.facility_id)
        if (data) {
            if (data.errCode === 0) {
                this.setState({
                    badProducts: data.products
                })
            } else if (data.errCode === 2) { //không có sản phẩm xấu
                this.setState({
                    badProducts: []
                })
            }
        }
    }

    repairProducts = async () => {
        const { facility } = this.props

        let res = await handleRepairProducts({ center_id: facility.facility_id })
        this.getBadProducts()
        return res
    }

    deliverBrokenProducts = async () => {
        const { facility } = this.props

        let res = await handleDeliverBrokenProducts({ center_id: facility.facility_id })
        this.getBadProducts()
        return res
    }

    repairButton = () => {
        this.setState({
            is_modal_repair_open: true
        })
    }

    toggleModalRepair = () => {
        this.setState({
            is_modal_repair_open: !this.state.is_modal_repair_open
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
        let badProducts = this.state.badProducts

        return (
            <div className='content'>
                <div className='title'>Quản lý sản phẩm cần bảo hành</div>
                <ModalConfirm
                    isOpen={this.state.is_modal_repair_open}
                    toggleModalConfirm={this.toggleModalRepair}
                    onConfirm={this.repairProducts}
                    message={'Sửa chữa sản phẩm?'}
                />
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
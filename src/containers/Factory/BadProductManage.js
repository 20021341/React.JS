import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleRecycleProducts, handleRepairProducts, handleReportDefective } from '../../services/factoryService';
import { handleGetBadProducts } from '../../services/siteService';
import ModalConfirm from '../Modal/ModalConfirm'
import ModalReportDefective from '../Modal/Factory/ModalReportDefective';

class BadProductManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            badProducts: [],
            is_modal_recycle_open: false,
            is_modal_repair_open: false,
            is_modal_report_open: false,
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

    recyleProducts = async () => {
        const { facility } = this.props

        try {
            let res = await handleRecycleProducts({ factory_id: facility.facility_id })
            console.log(res)
            if (res && res.errCode === 0) {
                await this.getBadProducts()
                this.toggleModalRecycle()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    repairProducts = async () => {
        const { facility } = this.props

        try {
            let res = await handleRepairProducts({ factory_id: facility.facility_id })
            console.log(res)
            if (res && res.errCode === 0) {
                await this.getBadProducts()
                this.toggleModalRepair()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    reportDefective = async (product_line) => {
        const { facility } = this.props

        let data = {
            product_line: product_line,
            factory_id: facility.facility_id
        }

        try {
            let res = await handleReportDefective(data)
            console.log(res)
            if (res && res.errCode === 0) {
                await this.getBadProducts()
                this.toggleModalReport()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    recycleButton = () => {
        this.setState({
            is_modal_recycle_open: true
        })
    }

    repairButton = () => {
        this.setState({
            is_modal_repair_open: true
        })
    }

    reportButton = () => {
        this.setState({
            is_modal_report_open: true
        })
    }

    toggleModalRecycle = () => {
        this.setState({
            is_modal_recycle_open: !this.state.is_modal_recycle_open
        })
    }

    toggleModalRepair = () => {
        this.setState({
            is_modal_repair_open: !this.state.is_modal_repair_open
        })
    }

    toggleModalReport = () => {
        this.setState({
            is_modal_report_open: !this.state.is_modal_report_open
        })
    }

    render() {
        let badProducts = this.state.badProducts

        return (
            <div className='product-container'>
                <div className='title text-center'>Bad Products</div>
                <ModalConfirm
                    isOpen={this.state.is_modal_recycle_open}
                    toggleModalConfirm={this.toggleModalRecycle}
                    onConfirm={this.recyleProducts}
                    message={'Tái chế các sản phẩm hỏng?'}
                />
                <ModalConfirm
                    isOpen={this.state.is_modal_repair_open}
                    toggleModalConfirm={this.toggleModalRepair}
                    onConfirm={this.repairProducts}
                    message={'Sửa chữa các sản phẩm lỗi?'}
                />
                <ModalReportDefective
                    isOpen={this.state.is_modal_report_open}
                    toggleModal={this.toggleModalReport}
                    reportDefective={this.reportDefective}
                />
                <div className='mx-1'>
                    <button className='btn btn-primary px-3 d-inline-flex'
                        onClick={() => this.recycleButton()}>
                        <i className='fa-solid fa-cart-shopping'></i>Tái chế sản phẩm hỏng
                    </button>
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3 d-inline-flex'
                        onClick={() => this.repairButton()}>
                        <i className='fa-solid fa-cart-shopping'></i>Sửa chữa sản phẩm lỗi
                    </button>
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3 d-inline-flex'
                        onClick={() => this.reportButton()}>
                        <i className='fa-solid fa-cart-shopping'></i>Báo cáo dòng sản phẩm lỗi
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
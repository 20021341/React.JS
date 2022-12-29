import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetProductsNeedRetrieving } from '../../services/agentService'

class RetrieveProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
        }
    }

    async componentDidMount() {
        await this.getProductsNeedRetrieving()
    }

    // lấy danh sách sản phẩm được mua ở đại lý này mà bị lỗi do nhà máy báo nhưng đang ở tay khách hàng
    getProductsNeedRetrieving = async () => {
        let { facility } = this.props

        // gọi api, truyền vào id của đại lý này
        let data = await handleGetProductsNeedRetrieving(facility.facility_id)

        if (data && data.errCode === 0) { // lấy danh sách thành công
            this.setState({
                products: data.products
            })
        }
    }

    render() {
        let products = this.state.products

        return (
            <div className='content'>
                <div className='title'>Sản phẩm cần thu hồi</div>

                <div className='table-container mt-3'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Mã sản phẩm</th>
                                <th scope="col">Mã khách hàng</th>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product) => {
                                    return (
                                        <tr>
                                            <td>{product.product_id}</td>
                                            <td>{product.customer_id}</td>
                                            <td>{product.fullname}</td>
                                            <td>{product.phone_number}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(RetrieveProduct);
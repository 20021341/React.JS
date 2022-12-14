import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetAllCustomers } from '../../services/customerService'

class CustomerManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            customers: [],
        }
    }

    async componentDidMount() {
        await this.getAllCustomers()
    }

    // lấy danh sách khách hàng (thông tin và số lượng sản phẩm họ đã mua)
    getAllCustomers = async () => {
        let data = await handleGetAllCustomers()

        if (data && data.errCode === 0) {
            this.setState({
                customers: data.customers
            })
        }
    }

    render() {
        let customers = this.state.customers

        return (
            <div className='content'>
                <div className='title'>Quản lý khách hàng</div>

                <div className='table-container mt-3'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Mã khách hàng</th>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Số lượng sản phẩm đã mua</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers.map((customer) => {
                                    return (
                                        <tr>
                                            <td>{customer.customer_id}</td>
                                            <td>{customer.fullname}</td>
                                            <td>{customer.phone_number}</td>
                                            <td>{customer.quantity_bought}</td>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManage);

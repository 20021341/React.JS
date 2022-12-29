import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetBillsByAgentID } from '../../services/agentService'
class BillManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bills: [],
            search_text: ''
        }
    }

    async componentDidMount() {
        await this.getBills()
    }

    // cập nhật lại giá trị cho thuộc tính search_text, sử dụng để lọc bảng
    handleOnChangeInput = (event, field) => {
        let copyState = { ...this.state }
        copyState[field] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log(this.state)
        })
    }

    // lấy danh sách hóa đơn được tạo ở đại lý này
    getBills = async () => {
        const { facility } = this.props

        // gọi api, truyền vào id của đại lý này
        let data = await handleGetBillsByAgentID(facility.facility_id)

        if (data && data.errCode === 0) { // lấy dữ liệu thành công, không có lỗi xảy ra
            this.setState({
                bills: data.bills
            })
        }
    }

    render() {
        let bills = this.state.bills

        return (
            <div className='content'>
                <div className='title'>Quản lý hóa đơn</div>

                <div className='search-area mx-3'>
                    <input type='text' value={this.state.search_text} placeholder='Tìm kiếm bằng mã khách hàng...'
                        onChange={(event) => { this.handleOnChangeInput(event, 'search_text') }}
                    />
                </div>

                <div className='table-container table-container mt-3'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Mã hóa đơn</th>
                                <th scope="col">Mã sản phẩm</th>
                                <th scope="col">Mã khách hàng</th>
                                <th scope="col">Ngày mua</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bills.map((bill) => {
                                    if (bill.customer_id.includes(this.state.search_text)) {
                                        return (
                                            <tr>
                                                <td>{bill.bill_id}</td>
                                                <td>{bill.product_id}</td>
                                                <td>{bill.customer_id}</td>
                                                <td>{bill.buy_date}</td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

// lấy thuộc tính của component cha
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

export default connect(mapStateToProps, mapDispatchToProps)(BillManage);

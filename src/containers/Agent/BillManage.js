import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetBillsByAgentID } from '../../services/agentService'
class BillManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bills: [],
        }
    }

    async componentDidMount() {
        await this.getBills()
    }

    getBills = async () => {
        const { facility } = this.props
        let data = await handleGetBillsByAgentID(facility.facility_id)
        if (data && data.errCode === 0) {
            console.log(data.bills)
            this.setState({
                bills: data.bills
            })
        }
    }

    render() {
        let bills = this.state.bills

        return (
            <div className='content'>
                <div className='title text-center'>Hóa đơn</div>
                <div className='mx-1 mt-3'>
                    <table className="table table-striped">
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
                                    return (
                                        <tr>
                                            <td>{bill.bill_id}</td>
                                            <td>{bill.product_id}</td>
                                            <td>{bill.customer_id}</td>
                                            <td>{bill.buy_date}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillManage);

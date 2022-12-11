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
            <div className='facility-container'>
                <div className='title text-center'>Customers</div>
                <div className='facility-table mx-1 mt-3'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Phone number</th>
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

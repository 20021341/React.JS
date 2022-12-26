import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetCardsByAgentID } from '../../services/agentService'
class WarrantyCardManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: [],
        }
    }

    async componentDidMount() {
        await this.getCards()
    }

    getCards = async () => {
        const { facility } = this.props
        let data = await handleGetCardsByAgentID(facility.facility_id)
        console.log(data)

        if (data && data.errCode === 0) {
            this.setState({
                cards: data.cards
            })
        }
    }

    render() {
        let cards = this.state.cards

        return (
            <div className='content'>
                <div className='title text-center'>Phiếu bảo hành</div>
                <div className='mx-1 mt-3'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Mã phiếu bảo hành</th>
                                <th scope="col">Mã sản phẩm</th>
                                <th scope="col">Mã khách hàng</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Ngày tạo</th>
                                <th scope="col">Trung tâm bảo hành</th>
                                <th scope="col">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cards.map((card) => {
                                    return (
                                        <tr>
                                            <td>{card.card_id}</td>
                                            <td>{card.product_id}</td>
                                            <td>{card.customer_id}</td>
                                            <td>{card.phone_number}</td>
                                            <td>{card.create_date}</td>
                                            <td>{card.facility_name}</td>
                                            <td>{card.status}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(WarrantyCardManage);

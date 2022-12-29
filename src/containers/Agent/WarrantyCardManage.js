import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetCardsByAgentID } from '../../services/agentService'
class WarrantyCardManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            search_text: ''
        }
    }

    async componentDidMount() {
        await this.getCards()
    }

    // cập nhật thuộc tính search_text
    handleOnChangeInput = (event, field) => {
        let copyState = { ...this.state }
        copyState[field] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log(this.state)
        })
    }

    // lấy danh sách phiếu bảo hành được tạo ở đại lý này và trạng thái của chúng
    getCards = async () => {
        const { facility } = this.props

        // gọi api, truyền vào id của đại lý này
        let data = await handleGetCardsByAgentID(facility.facility_id)

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
                <div className='title'>Quản lý phiếu bảo hành</div>

                <div className='search-area mx-3'>
                    <input type='text' value={this.state.search_text} placeholder='Tìm kiếm bằng mã khách hàng...'
                        onChange={(event) => { this.handleOnChangeInput(event, 'search_text') }}
                    />
                </div>

                <div className='table-container mt-3'>
                    <table className="table">
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
                                    if (card.customer_id.includes(this.state.search_text)) {
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

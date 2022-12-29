import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetAllProductLines, handleCreateNewProductLine } from '../../services/productService';
import ModalCreateProductLine from '../Modal/HeadQuarter/ModalCreateProductLine';

class ProductLineManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product_lines: [],
            is_modal_create_open: false
        }
    }

    async componentDidMount() {
        await this.getAllProductLines()
    }

    // lấy danh sách dòng sản phẩm
    getAllProductLines = async () => {
        let data = await handleGetAllProductLines()

        if (data && data.errCode === 0) {
            this.setState({
                product_lines: data.product_lines
            })
        }
    }

    // tạo dòng sản phẩm mới
    createProductLine = async (data) => {
        let res = await handleCreateNewProductLine(data)
        await this.getAllProductLines()
        return res
    }

    // nút tạo dòng sản phẩm
    createProductLineButton = () => {
        this.setState({
            is_modal_create_open: true
        })
    }

    // bật/tắt modal tạo dòng sản phẩm
    toggleModalCreate = () => {
        this.setState({
            is_modal_create_open: !this.state.is_modal_create_open
        })
    }

    render() {
        let product_lines = this.state.product_lines

        return (
            <div className='content'>
                <div className='title'>Quản lý dòng sản phẩm</div>

                {/* modal tạo dòng sản phẩm mới */}
                <ModalCreateProductLine
                    isOpen={this.state.is_modal_create_open}
                    toggleModal={this.toggleModalCreate}
                    createProductLine={this.createProductLine}
                />

                <button className='btn btn-red'
                    onClick={() => this.createProductLineButton()}>
                    Tạo dòng sản phẩm
                </button>

                <div className='table-container mt-3'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Dòng sản phẩm</th>
                                <th scope="col">CPU</th>
                                <th scope="col">GPU</th>
                                <th scope="col">RAM</th>
                                <th scope="col">Bộ nhớ</th>
                                <th scope="col">Màn hình hiển thị</th>
                                <th scope="col">Thời hạn bảo hành</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product_lines.map((product_line) => {
                                    return (
                                        <tr>
                                            <td>{product_line.product_line}</td>
                                            <td>{product_line.cpu}</td>
                                            <td>{product_line.gpu}</td>
                                            <td>{product_line.ram}</td>
                                            <td>{product_line.memory}</td>
                                            <td>{product_line.display}</td>
                                            <td>{product_line.warranty_period}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductLineManage);

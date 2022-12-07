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

    getAllProductLines = async () => {
        let data = await handleGetAllProductLines()
        if (data && data.errCode === 0) {
            this.setState({
                product_lines: data.product_lines
            })
        }
    }

    createProductLine = async (data) => {
        try {
            let res = await handleCreateNewProductLine(data)
            if (res && res.errCode === 0) {
                alert(res.message)
                await this.getAllProductLines()
                this.toggleModalCreate()
            } else {
                alert(res.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleCreateProductLineButton = () => {
        this.setState({
            is_modal_create_open: true
        })
    }

    toggleModalCreate = () => {
        this.setState({
            is_modal_create_open: !this.state.is_modal_create_open
        })
    }

    render() {
        let product_lines = this.state.product_lines

        return (
            <div className='facility-container'>
                <div className='title text-center'>Quản lý dòng sản phẩm</div>
                <ModalCreateProductLine
                    isOpen={this.state.is_modal_create_open}
                    toggleModal={this.toggleModalCreate}
                    createProductLine={this.createProductLine}
                />
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleCreateProductLineButton()}>
                        <i className='fas fa-plus'></i> Tạo dòng sản phẩm
                    </button>
                </div>
                <div className='facility-table mx-1 mt-3'>
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
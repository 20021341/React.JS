import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalCreateProductLine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_line: '',
            cpu: '',
            gpu: '',
            ram: '',
            memory: '',
            display: '',
            warranty_period: '',
            product_line_alert: '',
            cpu_alert: '',
            gpu_alert: '',
            ram_alert: '',
            memory_alert: '',
            display_alert: '',
            warranty_period_alert: '',
            res_message: '',
            // danh sách cấu hình được dựng sẵn để lựa chọn
            cpuList: [
                'Intel Core i9-12900H',
                'Intel Core i9-12900HK',
                'Intel Core i7-12700H',
                'Intel Core i7-12700HK',
                'Intel Core i5-12500H',
                'Intel Core i5-12500HK',
                'AMD Ryzen 9 6900H',
                'AMD Ryzen 9 6900HS',
                'AMD Ryzen 7 6800H',
                'AMD Ryzen 7 6800HS',
                'AMD Ryzen 5 6600H',
                'AMD Ryzen 5 6600HS'
            ],
            gpuList: [
                'NVIDIA GeForce RTX 3090 Ti',
                'NVIDIA GeForce RTX 3090',
                'NVIDIA GeForce RTX 3080 Ti',
                'NVIDIA GeForce RTX 3080',
                'NVIDIA GeForce RTX 3070 Ti',
                'NVIDIA GeForce RTX 3070',
                'NVIDIA GeForce RTX 3060 Ti',
                'NVIDIA GeForce RTX 3060',
                'NVIDIA GeForce RTX 2080 Ti',
                'NVIDIA GeForce RTX 2080',
                'NVIDIA GeForce RTX 2070 Ti',
                'NVIDIA GeForce RTX 2070',
                'NVIDIA GeForce RTX 2060 Ti',
                'NVIDIA GeForce RTX 2060',
                'NVIDIA GeForce RTX 1660 Ti',
                'NVIDIA GeForce RTX 1660',
                'NVIDIA GeForce RTX 1650 Ti',
                'NVIDIA GeForce RTX 1650'
            ],
            ramList: [
                '8GB DDR4 2933MHz',
                '8GB DDR4 3200MHz',
                '8GB DDR4 3600MHz',
                '8GB DDR5 4800MHz',
                '8GB DDR5 5200MHz',
                '8GB DDR5 6000MHz',
                '16GB DDR4 2933MHz',
                '16GB DDR4 3200MHz',
                '16GB DDR4 3600MHz',
                '16GB DDR5 4800MHz',
                '16GB DDR5 5200MHz',
                '16GB DDR5 6000MHz',
                '32GB DDR4 2933MHz',
                '32GB DDR4 3200MHz',
                '32GB DDR4 3600MHz',
                '32GB DDR5 4800MHz',
                '32GB DDR5 5200MHz',
                '32GB DDR5 6000MHz'
            ],
            memoryList: [
                '512 GB SSD NVMe PCIe',
                '1TB SSD NVMe PCIe',
                '2TB GB SSD NVMe PCIe',
            ],
            displayList: [
                '15.6" FullHD (1920 x 1080) 144Hz',
                '15.6" WQHD (2160 x 1350) 165Hz',
                '15.6" WQHD (2160 x 1350) 240Hz'
            ],
            warranty_periodList: [
                12, 24, 36
            ]
        }
    }

    async componentDidMount() {
    }

    handleOnChangeInput = (event, field) => {
        let copyState = { ...this.state }
        copyState[field] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log(this.state)
        })
    }

    // nút tạo dòng sản phẩm mới
    createProductLineButton = () => {
        this.setState({
            product_line_alert: '',
            cpu_alert: '',
            gpu_alert: '',
            ram_alert: '',
            memory_alert: '',
            display_alert: '',
            warranty_period_alert: '',
            res_message: '',
        })

        if (this.checkValidInput()) {
            let data = {
                product_line: this.state.product_line.trim().replace(/\s+/g, ' '),
                cpu: this.state.cpu,
                gpu: this.state.gpu,
                ram: this.state.ram,
                memory: this.state.memory,
                display: this.state.display,
                warranty_period: this.state.warranty_period
            }

            // gửi dữ liệu cho component quản lý dòng sản phẩm để gọi api
            let res = this.props.createProductLine(data)

            res.then((obj) => {
                if (obj.errCode === 0) {
                    this.toggle()
                } else {
                    this.setState({ res_message: obj.message })
                }
            })
        }
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['product_line', 'cpu', 'gpu', 'ram', 'memory', 'display', 'warranty_period']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                switch (arrInput[i]) {
                    case 'product_line':
                        this.setState({ product_line_alert: 'Chưa nhập tên dòng sản phẩm' })
                        break
                    case 'cpu':
                        this.setState({ cpu_alert: 'Chưa chọn bộ vi xử lí' })
                        break
                    case 'gpu':
                        this.setState({ gpu_alert: 'Chưa chọn bộ xử lí đồ họa' })
                        break
                    case 'ram':
                        this.setState({ ram_alert: 'Chưa chọn bộ nhớ RAM' })
                        break
                    case 'memory':
                        this.setState({ memory_alert: 'Chưa chọn bộ nhớ lưu trữ' })
                        break
                    case 'display':
                        this.setState({ display_alert: 'Chưa chọn độ phân giải' })
                        break
                    case 'warranty_period':
                        this.setState({ warranty_period_alert: 'Chưa chọn thời hạn bảo hành' })
                        break
                }
            }
        }

        if (!this.nameValidate(this.state.product_line)) {
            isValid = false
            this.setState({ product_line_alert: 'Dòng sản phẩm không đúng định dạng' })
        }

        return isValid
    }

    nameValidate = (name) => {
        var regExp = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
        return regExp.test(name)
    }

    toggle = () => {
        this.setState({
            product_line: '',
            cpu: '',
            gpu: '',
            ram: '',
            memory: '',
            display: '',
            warranty_period: '',
            product_line_alert: '',
            cpu_alert: '',
            gpu_alert: '',
            ram_alert: '',
            memory_alert: '',
            display_alert: '',
            warranty_period_alert: '',
            res_message: '',
        })

        this.props.toggleModal()
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.createProductLineButton()
        }
    }

    render() {
        let cpuList = this.state.cpuList
        let gpuList = this.state.gpuList
        let ramList = this.state.ramList
        let memoryList = this.state.memoryList
        let displayList = this.state.displayList
        let warranty_periodList = this.state.warranty_periodList

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>Tạo dòng sản phẩm mới</ModalHeader>

                <ModalBody>
                    <div className='modal-body'>
                        <div className='input-container'>
                            <div>
                                <label style={{ float: 'left' }}>Tên dòng sản phẩm</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.product_line_alert}
                                </label>
                            </div>

                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'product_line') }}
                                value={this.state.quantity}
                                onKeyDown={(event) => this.handleKeyDown(event)} />
                        </div>

                        <div className='select-container'>
                            <div>
                                <label style={{ float: 'left' }}>CPU</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.cpu_alert}
                                </label>
                            </div>

                            <select name='cpu' onChange={(event) => { this.handleOnChangeInput(event, 'cpu') }} >
                                <option value={''} selected={'selected'}>--Chọn bộ vi xử lí--</option>
                                {
                                    cpuList.map((cpu) => {
                                        return (
                                            <option value={cpu}>{cpu}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='select-container'>
                            <div>
                                <label style={{ float: 'left' }}>GPU</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.gpu_alert}
                                </label>
                            </div>

                            <select name='gpu' onChange={(event) => { this.handleOnChangeInput(event, 'gpu') }} >
                                <option value={''} selected={'selected'}>--Chọn bộ xử lí đồ họa--</option>
                                {
                                    gpuList.map((gpu) => {
                                        return (
                                            <option value={gpu}>{gpu}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='select-container'>
                            <div>
                                <label style={{ float: 'left' }}>RAM</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.ram_alert}
                                </label>
                            </div>

                            <select name='ram' onChange={(event) => { this.handleOnChangeInput(event, 'ram') }} >
                                <option value={''} selected={'selected'}>--Chọn bộ nhớ RAM--</option>
                                {
                                    ramList.map((ram) => {
                                        return (
                                            <option value={ram}>{ram}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='select-container'>
                            <div>
                                <label style={{ float: 'left' }}>ROM</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.memory_alert}
                                </label>
                            </div>

                            <select name='memory' onChange={(event) => { this.handleOnChangeInput(event, 'memory') }} >
                                <option value={''} selected={'selected'}>--Chọn bộ nhớ lưu trữ--</option>
                                {
                                    memoryList.map((memory) => {
                                        return (
                                            <option value={memory}>{memory}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='select-container'>
                            <div>
                                <label style={{ float: 'left' }}>Màn hình</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.display_alert}
                                </label>
                            </div>

                            <select name='display' onChange={(event) => { this.handleOnChangeInput(event, 'display') }} >
                                <option value={''} selected={'selected'}>--Chọn độ phân giải--</option>
                                {
                                    displayList.map((display) => {
                                        return (
                                            <option value={display}>{display}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='select-container'>
                            <div>
                                <label style={{ float: 'left' }}>Bảo hành</label>
                                <label style={{ color: 'red', float: 'right' }}>
                                    {this.state.warranty_period_alert}
                                </label>
                            </div>

                            <select name='warranty_period' onChange={(event) => { this.handleOnChangeInput(event, 'warranty_period') }} >
                                <option value={''} selected={'selected'}>--Chọn thời hạn bảo hành--</option>
                                {
                                    warranty_periodList.map((warranty_period) => {
                                        return (
                                            <option value={warranty_period}>{warranty_period + ' tháng'}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='response-container'>
                            <div style={{ color: 'red' }}>
                                {this.state.res_message}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                
                <ModalFooter>
                    <Button className='btn btn-confirm px-3' onClick={() => this.createProductLineButton()}>Tạo dòng sản phẩm</Button>{' '}
                    <Button className='btn btn-deny px-3' onClick={() => this.toggle()}>Hủy</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateProductLine);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Legend } from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { handleGetSalesOverProduceStatistics, handleGetDefectiveOverProduceStatistics } from '../../services/factoryService';

const Root = (props) => <Legend.Root {...props} className="m-auto flex-row" />;


class Statistics extends Component {

    constructor(props) {
        super(props)

        this.state = {
            year: 2022,
            // 2 dữ liệu giả để render ban đầu, sẽ được cập nhật lại sau
            // dữ liệu doanh số trên lượng sản xuất
            sales_data: [
                {
                    product_line: 'Alien', quantity_sold: 0, total: 0
                },
                {
                    product_line: 'Alpha', quantity_sold: 0, total: 0
                },
                {
                    product_line: 'Nitro', quantity_sold: 0, total: 0
                },
                {
                    product_line: 'ROG', quantity_sold: 0, total: 0
                },
                {
                    product_line: 'TUF', quantity_sold: 0, total: 0
                },
                {
                    product_line: 'Zephyrus', quantity_sold: 0, total: 0
                }],
            // dữ liệu số lượng phải đem đi bảo hành trên số lượng sản xuất
            defective_data: [
                {
                    product_line: 'Alien', quantity_defective: 0, total: 0
                },
                {
                    product_line: 'Alpha', quantity_defective: 0, total: 0
                },
                {
                    product_line: 'Nitro', quantity_defective: 0, total: 0
                },
                {
                    product_line: 'ROG', quantity_defective: 0, total: 0
                },
                {
                    product_line: 'TUF', quantity_defective: 0, total: 0
                },
                {
                    product_line: 'Zephyrus', quantity_defective: 0, total: 0
                }]
        }
    }

    async componentDidMount() {
        await this.getSalesStatistics(this.state.year)
        await this.getDefectiveStatistics(this.state.year)
    }

    // lấy dữ liệu thống kê doanh số bán được của những sản phẩm được sản xuất tại nhà máy này
    getSalesStatistics = async (year) => {
        const { facility } = this.props
        let sales_data = this.state.sales_data

        let res = await handleGetSalesOverProduceStatistics({
            factory_id: facility.facility_id,
            year: year,
        })

        // cập nhật dữ liệu thống kê
        for (let i = 0; i < sales_data.length; i++) {
            for (let j = 0; j < res.statistics.length; j++) {
                if (sales_data[i].product_line === res.statistics[j].product_line) {
                    sales_data[i].quantity_sold = res.statistics[j].quantity_sold
                    sales_data[i].total = res.statistics[j].total
                    break
                }
            }
        }

        this.setState({
            sales_data: sales_data
        })
    }

    // lấy dữ liệu thống kê lượng sản phẩm sản xuất tại nhà máy này phải đem đi bảo hành
    getDefectiveStatistics = async (year) => {
        const { facility } = this.props
        let defective_data = this.state.defective_data

        let res = await handleGetDefectiveOverProduceStatistics({
            factory_id: facility.facility_id,
            year: year,
        })

        // cập nhật lại dữ liệu thống kê
        for (let i = 0; i < defective_data.length; i++) {
            for (let j = 0; j < res.statistics.length; j++) {
                if (defective_data[i].product_line === res.statistics[j].product_line) {
                    defective_data[i].quantity_defective = res.statistics[j].quantity_defective
                    defective_data[i].total = res.statistics[j].total
                    break
                }
            }
        }

        this.setState({
            defective_data: defective_data
        })
    }

    // tăng năm lên
    switchYearUp = async () => {
        let year = this.state.year + 1
        this.getSalesStatistics(year)
        this.getDefectiveStatistics(year)
        this.setState({
            year: year
        })
    }

    // giảm năm xuống
    switchYearDown = async () => {
        let year = this.state.year - 1
        this.getSalesStatistics(year)
        this.getDefectiveStatistics(year)
        this.setState({
            year: year
        })
    }

    render() {
        const { sales_data: salesData } = this.state;
        const { defective_data: defectiveData } = this.state;

        return (
            <div className='statistics-container'>
                <div className='sales-over-produce-statistics col-6'>
                    <div>
                        <div className='statistics-title mx-3'>
                            <i className="arrow left" onClick={() => this.switchYearDown()}></i>
                            Thống kê bán/sản xuất {this.state.year}
                            <i className="arrow right" onClick={() => this.switchYearUp()}></i>
                        </div>
                    </div>

                    {/* biểu đồ doanh số bán trên số lượng sản xuất */}
                    <Chart data={salesData}>
                        <ArgumentAxis />
                        <ValueAxis />

                        <BarSeries
                            name="Số lượng đã được bán"
                            valueField="quantity_sold"
                            argumentField="product_line"
                            color="#0071ba"
                        />
                        <BarSeries
                            name="Số lượng sản xuất"
                            valueField="total"
                            argumentField="product_line"
                            color="#bb8d09"

                        />

                        <Animation />
                        <Legend position="bottom" rootComponent={Root} />
                        <Stack
                            stacks={[
                                {
                                    series: ['Số lượng đã được bán', 'Số lượng sản xuất']
                                },
                            ]}
                        />
                    </Chart>
                </div>

                <div className='defective-over-produce-statistics col-6'>
                    <div>
                        <div className='statistics-title mx-3'>
                            <i className="arrow left" onClick={() => this.switchYearDown()}></i>
                            Thống kê bảo hành/sản xuất {this.state.year}
                            <i className="arrow right" onClick={() => this.switchYearUp()}></i>
                        </div>
                    </div>

                    {/* biểu đồ số lượng đem đi bảo hành trên số lượng sản xuất */}
                    <Chart data={defectiveData}>
                        <ArgumentAxis />
                        <ValueAxis />

                        <BarSeries
                            name="Số lượng bị lỗi"
                            valueField="quantity_defective"
                            argumentField="product_line"
                            color="#00C087"
                        />
                        <BarSeries
                            name="Số lượng sản xuất"
                            valueField="total"
                            argumentField="product_line"
                            color="#ff9600"

                        />

                        <Animation />
                        <Legend position="bottom" rootComponent={Root} />
                        <Stack
                            stacks={[
                                {
                                    series: ['Số lượng bị lỗi', 'Số lượng sản xuất']
                                },
                            ]}
                        />
                    </Chart>
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

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);

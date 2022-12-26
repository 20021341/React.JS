import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Legend } from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { handleGetAllProductLines } from '../../services/productService'
import { handleGetSalesStatisticsByProductLine } from '../../services/agentService';

const Root = (props) => <Legend.Root {...props} className="m-auto flex-row" />;


class SalesStatistics extends Component {

    constructor(props) {
        super(props)

        this.state = {
            year: 2022,
            product_lines: [],
            data: [
                {
                    month: 'T1', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                },
                {
                    month: 'T2', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                },
                {
                    month: 'T3', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                },
                {
                    month: 'T4', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                },
                {
                    month: 'T5', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                },
                {
                    month: 'T6', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                },
                {
                    month: 'T7', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                },
                {
                    month: 'T8', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                },
                {
                    month: 'T9', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                },
                {
                    month: 'T10', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                },
                {
                    month: 'T11', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                },
                {
                    month: 'T12', Alien: 0, Alpha: 0, Nitro: 0, ROG: 0, Strix: 0, TUF: 0, Zephyrus: 0
                }]
        }
    }

    async componentDidMount() {
        await this.getAllProductLines()
        await this.getStatistics(this.state.year)
    }

    getStatistics = async (year) => {
        const { facility } = this.props
        let product_lines = this.state.product_lines
        let data = this.state.data

        for (let i = 0; i < product_lines.length; i++) {
            let product_line = product_lines[i]
            let res = await handleGetSalesStatisticsByProductLine({
                agent_id: facility.facility_id,
                year: year,
                product_line: product_line
            })

            console.log(res)

            for (let j = 0; j < data.length; j++) {
                data[j][product_line] = res.statistics[j].quantity_sold
            }
        }

        this.setState({
            data: data
        })
    }

    getAllProductLines = async () => {
        let res = await handleGetAllProductLines()
        if (res && res.errCode === 0) {
            let product_lines = []
            res.product_lines.map((obj) => {
                product_lines.push(obj.product_line)
            })
            this.setState({
                product_lines: product_lines
            })
        }
    }

    switchYearUp = async () => {
        let year = this.state.year + 1
        this.getStatistics(year)
        this.setState({
            year: year
        })
    }

    switchYearDown = async () => {
        let year = this.state.year - 1
        this.getStatistics(year)
        this.setState({
            year: year
        })
    }

    render() {
        const { data: chartData } = this.state;
        const product_lines = this.state.product_lines

        return (
            <div className="card">
                <div>
                    <div className='title text-center'>
                        <i className="arrow left" onClick={() => this.switchYearDown()}></i>
                        Thống kê số lượng sản phẩm đã bán năm {this.state.year}
                        <i className="arrow right" onClick={() => this.switchYearUp()}></i>
                    </div>
                </div>
                <Chart data={chartData}>
                    <ArgumentAxis />
                    <ValueAxis />

                    {
                        product_lines.map((product_line) => {
                            return (
                                <BarSeries name={product_line} valueField={product_line} argumentField="month" />
                            )
                        })
                    }

                    <Animation />
                    <Legend position="bottom" rootComponent={Root} />
                    <Stack
                        stacks={[
                            {
                                series: product_lines
                            },
                        ]}
                    />
                </Chart>
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesStatistics);

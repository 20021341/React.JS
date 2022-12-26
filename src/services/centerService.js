import axios from '../axios';

const handleRepairProducts = (data) => {
    return axios.post('api/center/repair-products', data);
}

const handleDeliverBrokenProducts = (data) => {
    return axios.post('api/center/deliver-broken-products', data);
}

const handleGetWarrantyStatisticsByProductLine = (data) => {
    return axios.get('api/center/get-warranty-statistics-by-product-line',
        { params: { center_id: data.center_id, year: data.year, product_line: data.product_line } })
}

const handleGetBrokenRateStatistics = (data) => {
    return axios.get('api/center/get-broken-rate-statistics',
        { params: { center_id: data.center_id, year: data.year } })
}

export {
    handleRepairProducts,
    handleDeliverBrokenProducts,
    handleGetWarrantyStatisticsByProductLine,
    handleGetBrokenRateStatistics
};
import axios from '../axios';

const handleGetSalesOverProduceStatistics = (data) => {
    return axios.get('api/factory/get-sales-over-produce-statistics',
        { params: { factory_id: data.factory_id, year: data.year } })
}

const handleGetDefectiveOverProduceStatistics = (data) => {
    return axios.get('api/factory/get-defective-over-produce-statistics',
        { params: { factory_id: data.factory_id, year: data.year } })
}

const handleProduceProducts = (data) => {
    return axios.post('api/factory/create-products', data);
}

const handleDeliverProducts = (data) => {
    return axios.post('api/factory/deliver-products', data);
}

const handleRecycleProducts = (data) => {
    return axios.post('api/factory/recycle-products', data);
}

const handleRepairProducts = (data) => {
    return axios.post('api/factory/repair-products', data);
}

const handleReportDefective = (data) => {
    return axios.post('api/factory/report-defective-products', data);
}

export {
    handleProduceProducts,
    handleDeliverProducts,
    handleRecycleProducts,
    handleRepairProducts,
    handleReportDefective,
    handleGetSalesOverProduceStatistics,
    handleGetDefectiveOverProduceStatistics
};
import axios from '../axios';

// gọi api lấy dữ liệu thống kê doanh số bán trên số lượng sản xuất
const handleGetSalesOverProduceStatistics = (data) => {
    return axios.get('api/factory/get-sales-over-produce-statistics',
        { params: { factory_id: data.factory_id, year: data.year } })
}

// gọi api lấy dữ liệu thống kê số lượng đem đi bảo hành trên số lượng sản xuất
const handleGetDefectiveOverProduceStatistics = (data) => {
    return axios.get('api/factory/get-defective-over-produce-statistics',
        { params: { factory_id: data.factory_id, year: data.year } })
}

// gọi api sản xuất sản phẩm 
const handleProduceProducts = (data) => {
    return axios.post('api/factory/create-products', data);
}

// gọi api vận chuyển sản phẩm
const handleDeliverProducts = (data) => {
    return axios.post('api/factory/deliver-products', data);
}

// gọi api tái chế sản phẩm
const handleRecycleProducts = (data) => {
    return axios.post('api/factory/recycle-products', data);
}

// gọi api sửa chữa sản phẩm
const handleRepairProducts = (data) => {
    return axios.post('api/factory/repair-products', data);
}

// gọi api báo cáo dòng sản phẩm lỗi
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
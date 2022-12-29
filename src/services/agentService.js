import axios from '../axios';

// gọi api lấy dữ liệu thống kê doanh số bán hàng theo dòng sản phẩm
const handleGetSalesStatisticsByProductLine = (data) => {
    return axios.get('api/agent/get-sales-statistics-by-product-line',
        { params: { agent_id: data.agent_id, year: data.year, product_line: data.product_line } })
}

// gọi api tạo hóa đơn
const handleCreateBill = (data) => {
    return axios.post('api/agent/create-bill', data)
}

// gọi api tạo phiếu bảo hành
const handleCreateCard = (data) => {
    return axios.post('api/agent/create-card', data)
}

// gọi api vận chuyển sản phẩm bảo hành của khách hàng
const handleDeliverCustomerProducts = (data) => {
    return axios.post('api/agent/deliver-customers-products', data)
}

// gọi api vận chuyến sản phẩm lỗi 
const handleDeliverDefectiveProducts = (data) => {
    return axios.post('api/agent/deliver-defective-products', data)
}

// gọi api lấy danh sách hóa đơn của một đại lý
const handleGetBillsByAgentID = (agent_id) => {
    return axios.get('api/agent/get-bills-by-agent-id', { params: { agent_id: agent_id } })
}

// gọi api lấy danh sách phiếu bảo hành của 1 đại lý
const handleGetCardsByAgentID = (agent_id) => {
    return axios.get('api/agent/get-cards-by-agent-id', { params: { agent_id: agent_id } })
}

// gọi api lấy danh sách sản phẩm lỗi cần thu hồi
const handleGetProductsNeedRetrieving = (agent_id) => {
    return axios.get('api/agent/get-products-need-retrieving', { params: { agent_id: agent_id } })
}


export {
    handleGetSalesStatisticsByProductLine,
    handleCreateBill,
    handleCreateCard,
    handleDeliverCustomerProducts,
    handleDeliverDefectiveProducts,
    handleGetBillsByAgentID,
    handleGetCardsByAgentID,
    handleGetProductsNeedRetrieving,
};
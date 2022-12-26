import axios from '../axios';

const handleGetSalesStatisticsByProductLine = (data) => {
    return axios.get('api/agent/get-sales-statistics-by-product-line',
        { params: { agent_id: data.agent_id, year: data.year, product_line: data.product_line } })
}

const handleCreateBill = (data) => {
    return axios.post('api/agent/create-bill', data)
}

const handleCreateCard = (data) => {
    return axios.post('api/agent/create-card', data)
}

const handleDeliverCustomerProducts = (data) => {
    return axios.post('api/agent/deliver-customers-products', data)
}

const handleDeliverDefectiveProducts = (data) => {
    return axios.post('api/agent/deliver-defective-products', data)
}

const handleGetBillsByAgentID = (agent_id) => {
    return axios.get('api/agent/get-bills-by-agent-id', { params: { agent_id: agent_id } })
}

const handleGetCardsByAgentID = (agent_id) => {
    return axios.get('api/agent/get-cards-by-agent-id', { params: { agent_id: agent_id } })
}

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
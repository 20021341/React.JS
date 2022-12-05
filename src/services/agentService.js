import axios from '../axios';

const handleGetGoodProducts = (facility_id) => {
    return axios.get('api/get-new-products', { params: { facility_id: facility_id } })
}

const handleGetBadProducts = (facility_id) => {
    return axios.get('api/get-need-action-products', { params: { facility_id: facility_id } })
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

export {
    handleGetGoodProducts,
    handleCreateBill,
    handleGetBadProducts,
    handleCreateCard,
    handleDeliverCustomerProducts,
    handleDeliverDefectiveProducts,
    handleGetBillsByAgentID,
    handleGetCardsByAgentID,
};
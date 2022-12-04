import axios from '../axios';

const handleGetGoodProducts = (agent_id) => {
    return axios.get('api/get-new-products', { params: { facility_id: agent_id } })
}

const handleGetBadProducts = (agent_id) => {
    return axios.get('api/get-need-action-products', { params: { facility_id: agent_id } })
}

const handleCreateBill = (data) => {
    return axios.post('api/agent/create-bill', data)
}

const handleCreateCard = (data) => {
    return axios.post('api/agent/create-card', data)
}

export {
    handleGetGoodProducts, handleCreateBill, handleGetBadProducts, handleCreateCard
};
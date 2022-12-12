import axios from '../axios';

const handleLogin = (facility_id, password) => {
    return axios.post('api/login', { facility_id: facility_id, password: password });
}

const handleGetGoodProducts = (facility_id) => {
    return axios.get('api/get-good-products', { params: { facility_id: facility_id } })
}

const handleGetBadProducts = (facility_id) => {
    return axios.get('api/get-bad-products', { params: { facility_id: facility_id } })
}

export {
    handleGetGoodProducts,
    handleGetBadProducts,
    handleLogin
};
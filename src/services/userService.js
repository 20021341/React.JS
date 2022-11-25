import axios from '../axios';

const handleLoginAPI = (facility_id, password) => {
    return axios.post('api/login', { facility_id: facility_id, password: password });
}

const handleGetAllFacilities = () => {
    return axios.get('api/hq/get-all-facilities', {})
}

export {
    handleLoginAPI, handleGetAllFacilities
};
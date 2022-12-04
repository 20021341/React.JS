import axios from '../axios';

const handleLoginAPI = (facility_id, password) => {
    return axios.post('api/login', { facility_id: facility_id, password: password });
}

const handleGetAllFacilities = () => {
    return axios.get('api/hq/get-all-facilities', {})
}

const handleCreateFacility = (data) => {
    return axios.post('api/hq/create-facility', data)
}

const handleGetFacilititesByRole = (role) => {
    return axios.get('api/hq/get-facilities-by-role', { params: { role: role } })
}

export {
    handleLoginAPI, handleGetAllFacilities, handleCreateFacility, handleGetFacilititesByRole
};
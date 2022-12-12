import axios from '../axios';

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
    handleGetAllFacilities, handleCreateFacility, handleGetFacilititesByRole
};
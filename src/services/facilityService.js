import axios from '../axios';

// gọi api lấy danh sách cơ sở
const handleGetAllFacilities = () => {
    return axios.get('api/hq/get-all-facilities', {})
}

// gọi api tạo cơ sở mới
const handleCreateFacility = (data) => {
    return axios.post('api/hq/create-facility', data)
}

// gọi api lấy danh sách cơ sở theo vai trò
const handleGetFacilititesByRole = (role) => {
    return axios.get('api/hq/get-facilities-by-role', { params: { role: role } })
}

export {
    handleGetAllFacilities, handleCreateFacility, handleGetFacilititesByRole
};
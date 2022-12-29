import axios from '../axios';

// gọi api đăng nhập
const handleLogin = (facility_id, password) => {
    return axios.post('api/login', { facility_id: facility_id, password: password });
}

// gọi api lấy danh sách sản phẩm tồn kho của cơ sở
const handleGetGoodProducts = (facility_id) => {
    return axios.get('api/get-good-products', { params: { facility_id: facility_id } })
}

// gọi api lấy danh sách sản phẩm lỗi hay bảo hành của cơ sở
const handleGetBadProducts = (facility_id) => {
    return axios.get('api/get-bad-products', { params: { facility_id: facility_id } })
}

export {
    handleGetGoodProducts,
    handleGetBadProducts,
    handleLogin
};
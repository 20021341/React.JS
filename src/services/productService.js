import axios from '../axios';

// gọi api lấy danh sách dòng sản phẩm
const handleGetAllProductLines = () => {
    return axios.get('api/hq/get-all-product-lines', {})
}

// gọi api tạo dòng sản phẩm mới
const handleCreateNewProductLine = (data) => {
    return axios.post('api/hq/create-new-product-line', data)
}

export {
    handleGetAllProductLines,
    handleCreateNewProductLine
};
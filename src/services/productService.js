import axios from '../axios';

const handleGetAllProductLines = () => {
    return axios.get('api/hq/get-all-product-lines', {})
}

const handleCreateNewProductLine = (data) => {
    return axios.post('api/hq/create-new-product-line', data)
}

export {
    handleGetAllProductLines,
    handleCreateNewProductLine
};
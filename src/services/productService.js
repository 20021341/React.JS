import axios from '../axios';

const handleGetAllProductLines = () => {
    return axios.get('api/hq/get-all-product-lines', {})
}

export {
    handleGetAllProductLines
};
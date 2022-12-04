import axios from '../axios';

const handleGetAllCustomers = () => {
    return axios.get('api/hq/get-all-customers', {})
}

const handleGetProductsOfCustomer = (customer_id) => {
    return axios.get('api/get-products-of-customer', { params: { customer_id: customer_id } })
}

export {
    handleGetAllCustomers, handleGetProductsOfCustomer
};
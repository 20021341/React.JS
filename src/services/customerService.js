import axios from '../axios';

// gọi api lấy danh sách khách hàng
const handleGetAllCustomers = () => {
    return axios.get('api/hq/get-all-customers', {})
}

// gọi api lấy thông tin khách hàng theo id
const handleGetCustomerByID = (customer_id) => {
    return axios.get('api/hq/get-customer-by-id', { params: { customer_id: customer_id } })
}

// lấy danh sách sản phẩm khách hàng đã mua
const handleGetProductsOfCustomer = (customer_id) => {
    return axios.get('api/get-products-of-customer', { params: { customer_id: customer_id } })
}

export {
    handleGetAllCustomers, handleGetProductsOfCustomer, handleGetCustomerByID
};
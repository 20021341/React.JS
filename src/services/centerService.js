import axios from '../axios';

// gọi api sửa chữa sản phẩm
const handleRepairProducts = (data) => {
    return axios.post('api/center/repair-products', data);
}

// gọi api vận chuyển sản phẩm hỏng
const handleDeliverBrokenProducts = (data) => {
    return axios.post('api/center/deliver-broken-products', data);
}

// gọi api lấy dữ liệu thống kê lượng sản phẩm bảo hành
const handleGetWarrantyStatisticsByProductLine = (data) => {
    return axios.get('api/center/get-warranty-statistics-by-product-line',
        { params: { center_id: data.center_id, year: data.year, product_line: data.product_line } })
}

export {
    handleRepairProducts,
    handleDeliverBrokenProducts,
    handleGetWarrantyStatisticsByProductLine,
};
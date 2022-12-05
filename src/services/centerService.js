import axios from '../axios';

const handleRepairProducts = (data) => {
    return axios.post('api/center/repair-products', data);
}

const handleDeliverBrokenProducts = (data) => {
    return axios.post('api/center/deliver-broken-products', data);
}

export {
    handleRepairProducts,
    handleDeliverBrokenProducts,
};
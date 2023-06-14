import {$authHost, $host} from "./index";

export const createOrder = async ({items, platformId, promoCode}) => {
    const {data} = await $authHost.post('api/orderList', {items, platformId, promoCode});
    return data;
}
export const sendPaymentDetails = async (orderId) => {
    const {data} = await $authHost.put('api/orderList/send-payment-details', {orderId});
    return data;
}
export const confirmPaymentOrder = async (orderId) => {
    const {data} = await $authHost.put('api/orderList/confirm-payment', {orderId});
    return data;
}
export const fetchAllUserOrders = async () => {
    const {data} = await $authHost.get('api/orderList');
    return data;
}
export const fetchAllOrders = async () => {
    const {data} = await $authHost.get('api/orderList/all');
    return data;
}
export const deleteOrder = async (id) => {
    const {data} = await $authHost.post(`api/orderList/${id}`);
    return data;
}

import {$authHost, $host} from "./index";

export const createOrder = async (items) => {
    const {data} = await $authHost.post('api/orderList', {items});
    return data;
}
export const confirmPaymentOrder = async (gameId) => {
    const {data} = await $authHost.put('api/orderList/confirm-payment', {gameId});
    return data;
}
export const fetchAllOrders = async () => {
    const {data} = await $authHost.get('api/orderList');
    return data;
}
export const deleteOrder = async (id) => {
    const {data} = await $authHost.post(`api/orderList/${id}`);
    return data;
}

import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Пользователь
export const registration = async (login, email, password) => {
    const {data} = await $host.post('api/user/registration', {login, email, password, role: 'ADMIN'});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}
export const checkAuth = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

//Корзина
export const getAllGamesFromBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}
export const addGameToBasket = async (gameId) => {
    const {data} = await $authHost.post('api/basket', {gameId});
    return data;
}
export const updateGameQuantityInBasket = async (gameId, operation) => {
    const {data} = await $authHost.put('api/basket', {gameId, operation});
    return data;
}
export const removeGameFromBasket = async (gameId) => {
    const {data} = await $authHost.delete('api/basket/' + gameId, );
    return data;
}

//Список желаемого
export const getAllGamesFromWishlist = async () => {
    const {data} = await $authHost.get('api/wishlist');
    return data;
}
export const addGameToWishlist = async (gameId) => {
    const {data} = await $authHost.post('api/wishlist', {gameId});
    return data;
}
export const removeGameFromWishlist = async (gameId) => {
    const {data} = await $authHost.delete('api/wishlist/' + gameId, );
    return data;
}
export const moveGameFromWishlistToBasket = async (gameId) => {
    const {data} = await $authHost.put('api/wishlist/moveToBasket', {gameId});
    return data;
}

//Список заказов
export const getAllOrders = async () => {
    const {data} = await $authHost.get('api/orderList');
    return data;
}
export const getAllGamesConfirmedOrders = async () => {
    const {data} = await $authHost.get('api/orderList/get-all-games-confirmed-orders');
    return data;
}
export const createOrder = async (games) => {
    const {data} = await $authHost.post('api/orderList', {games});
    return data;
}
export const confirmPaymentOrder = async (gameId) => {
    const {data} = await $authHost.post('api/orderList/confirm-payment', {gameId});
    return data;
}
export const deleteOrder = async (id) => {
    const {data} = await $authHost.post('api/orderList/' + id);
    return data;
}

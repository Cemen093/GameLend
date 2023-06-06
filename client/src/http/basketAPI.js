import {$authHost, $host} from "./index";

export const addGameToBasket = async (gameId) => {
    const {data} = await $authHost.post('api/basket', {gameId});
    return data;
}
export const fetchAllGamesFromBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}
export const removeAllGameFromBasket = async () => {
    const {data} = await $authHost.delete('api/basket/all');
    return data;
}
export const removeGameFromBasket = async (id) => {
    const {data} = await $authHost.delete(`api/basket/${id}`);
    return data;
}

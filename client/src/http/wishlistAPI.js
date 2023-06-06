import {$authHost, $host} from "./index";

export const addGameToWishlist = async (gameId) => {
    const {data} = await $authHost.post('api/wishlist', {gameId});
    return data;
}
export const moveGameFromWishlistToBasket = async (gameId) => {
    const {data} = await $authHost.put('api/wishlist/moveToBasket', {gameId});
    return data;
}
export const fetchAllGamesFromWishlist = async () => {
    const {data} = await $authHost.get('api/wishlist');
    return data;
}
export const removeGameFromWishlist = async (gameId) => {
    const {data} = await $authHost.delete(`api/wishlist/${gameId}`);
    return data;
}

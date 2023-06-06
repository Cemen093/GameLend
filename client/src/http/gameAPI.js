import {$authHost, $host} from "./index";

export const createGame = async (game) => {
    const {data} = await $authHost.post("api/game", game);
    return data;
};

export const updateGame = async (game) => {
    const {data} = await $authHost.put("api/game", game);
    return data;
};
export const fetchGames = async ({...props}) => {
    const {data} = await $host.get("api/game", {params: {...props},});
    return data;
};
export const fetchRandomGames = async ({...props}) => {
    const {data} = await $host.get("api/game/random", {params: {...props},});
    return data;
};

export const fetchGame = async (id) => {
    const {data} = await $host.get(`api/game/${id}`);
    return data;
};

export const deleteGame = async (id) => {
    const {data} = await $authHost.delete(`api/game/${id}`);
    return data;
};

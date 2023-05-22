import {$authHost, $host} from "./index";

export const createGame = async ({game}) => {
    const {data} = await $authHost.post('api/game', ...game)
    return data;
}

export const fetchGames = async ({title='', platformsId=[], typeSortId=1, page=1, limit=10}) => {
    const { data } = await $host.get(
        'api/game',
        {params: {title, platformsId, typeSortId, page, limit}
    });
    return data;
}

export const fetchGame = async (id) => {
    const {data} = await $host.get('api/game/' + id)
    console.log(data)
    return data;
}

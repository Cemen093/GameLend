import {$authHost, $host} from "./index";

export const createTypeSort = async (game) => {
    const {data} = await $authHost.post('api/typeSort', ...game)
    return data;
}

export const fetchTypesSort = async () => {
    const {data} = await $host.get('api/typeSort')
    return data;
}

export const fetchTypeSort = async (id) => {
    const {data} = await $host.get('api/typeSort/' + id)
    return data
}

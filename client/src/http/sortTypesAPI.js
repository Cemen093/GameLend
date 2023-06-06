import {$authHost, $host} from "./index";

export const createSortType = async (title, order) => {
    const {data} = await $authHost.post('api/typeSort', {title, order})
    return data;
}

export const fetchSortTypes = async () => {
    const {data} = await $host.get('api/typeSort')
    return data;
}

export const fetchSortType = async (id) => {
    const {data} = await $host.get(`api/typeSort/${id}`)
    return data
}

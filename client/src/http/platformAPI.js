import {$authHost, $host} from "./index";

export const createPlatform = async (title) => {
    const {data} = await $authHost.post('api/platform', {title})
    return data;
}

export const fetchPlatforms = async () => {
    const {data} = await $host.get('api/platform')
    return data;
}

export const fetchPlatform = async (id) => {
    const {data} = await $host.get(`api/platform/${id}`)
    return data
}

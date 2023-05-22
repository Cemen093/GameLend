import {$authHost, $host} from "./index";

export const createPlatform = async () => {
    const {data} = await $authHost.post('api/platform')
    return data;
}

export const fetchPlatforms = async () => {
    const {data} = await $host.get('api/platform')
    return data;
}

export const fetchPlatform = async (id) => {
    const {data} = await $host.get('api/platform/' + id)
    return data
}

import {$authHost, $host} from "./index";
import {fetchRandomGames} from "./gameAPI";

export const createComment = async ({ text, img, gameId }) => {
    const {data} = await $authHost.post('api/comment', { text, img, gameId })
    return data;
}
export const updateComment = async ({ id, text, img }) => {
    const {data} = await $authHost.put('api/comment', { id, text, img })
    return data;
}
export const fetchAllComments = async () => {
    const {data} = await $authHost.get('api/comment')
    return data;
}
export const fetchAllCommentsForGame = async (gameId) => {
    const {data} = await $authHost.get(`api/comment/${gameId}`)
    return data;
}
export const fetchOneComment = async (id) => {
    const {data} = await $authHost.get(`api/comment/${id}`)
    return data;
}
export const deleteComment = async (id) => {
    const {data} = await $authHost.delete(`api/comment/${id}`)
    return data;
}

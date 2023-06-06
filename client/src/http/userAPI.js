import {$authHost, $host} from "./index";

export const registration = async (login, email, password) => {
    const {data} = await $host.post('api/user/registration', {login, email, password});
    return data;
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    return data;
}
export const checkAuth = async () => {
    const {data} = await $authHost.get('api/user/auth');
    return data
}
export const updateUser = async (user) => {
    const {data} = await $authHost.put('api/user/update', user);
    return data
}
export const updateUserByAdmin = async ({email, user}) => {
    const {data} = await $authHost.put(`api/user/update/${email}`, user);
    return data
}
export const deleteUserByAdmin = async (id) => {
    const {data} = await $authHost.delete(`api/user/${id}`);
    return data
}

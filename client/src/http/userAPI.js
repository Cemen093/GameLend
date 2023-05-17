import {$host} from "./index";


export const registration = async (login, email, password) => {
    const response = await $host.post('api/auth/registration', {login, email, password, role: 'ADMIN'})
    return response;
}

export const login = async (email, password) => {
    const response = await $host.post('api/auth/registration', {email, password})
    return response;
}

export const auth = async () => {
    const response = await $host.post('api/auth/registration')
    return response;
}

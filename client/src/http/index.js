import axios from "axios";

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
}

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
}

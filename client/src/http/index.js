import axios from "axios";

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}
const ifHasFileToFormData = (config) => {
    if (typeof config.data === 'object' && config.data !== null && hasFiles(config.data)) {
        config.data = convertToFormData(config.data, new FormData());
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
};
const hasFiles = (data) => {
    for (const value of Object.values(data)) {
        if (typeof value === 'object' && value !== null) {
            if (value instanceof File) {
                return true;
            }
            if (hasFiles(value)) {
                return true;
            }
        }
    }
    return false;
};
const convertToFormData = (data, formData = new FormData()) => {
    for (const key in data) {
        if (Array.isArray(data[key])) {
            data[key].forEach(value => {
                formData.append(key, value);
            });
        } else if (typeof data[key] === 'object' && data[key] !== null) {
            if (data[key] instanceof File) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, JSON.stringify(data[key]));
            }
        } else {
            formData.append(key, data[key]);
        }
    }

    return formData;
};
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

$authHost.interceptors.request.use(authInterceptor);
$authHost.interceptors.request.use(ifHasFileToFormData);

export {
    $host,
    $authHost,
}

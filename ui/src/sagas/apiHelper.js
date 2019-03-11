import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://httpbin.org',
    timeout: 1000,
});

export function postHelper({ path, params }) {
    return instance.post(path, params)
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export function getHelper({ path, params }) {
    return instance.get(path, { params })
    .then(response => ({ response }))
    .catch(error => ({ error }))
}
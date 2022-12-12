import axios from 'axios';
import { useHistory } from 'react-router-dom';
export const AxiosProvider = {
    get,
    post
}

async function get(url, params) {
    return await axios.get(url, {
        params: params
    });
}

async function post(url, body) {
    return await axios.post(url, body);
}

axios.interceptors.request.use(
    (request) => {
        request.headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'content-type': 'application/json' }
        return request;
    },
    (error) => {
        alert(error);
    }
);

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response) {
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.href  = '/invoice/sign-in';
            return;
        }

        console.log(error);
        return error.response;
    }
    else if (error.request) {
        console.log(error.request);
    }
    else {
        console.log(error.message);
    }

    return Promise.reject(error);
});
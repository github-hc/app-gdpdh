import axios from 'axios';

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

        return error.response;
    }
    else if (error.request) {
        alert('Network Request Error');
    }
    else {
        alert('Network  Error');
    }

    return Promise.reject(error);
});
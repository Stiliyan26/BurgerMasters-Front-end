export const requester = async (url, method = 'GET', body, token) => {
    const options = createOptions(method, body, token);
    const res = await fetch(url, options);
    const data = await res.json();

    return data;
}

const createOptions = (method = 'GET', body, token) => {
    const options = {
        method
    }

    options.headers = {};

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (method === 'GET') {
        return options;
    }

    options.headers['Content-Type'] = 'application/json';

    options.body = JSON.stringify(body);

    return options;
}
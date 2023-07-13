const baseUrl = 'https://localhost:7129/api/Menu';


export const getAllItemTypes = () => requester(`${baseUrl}/AllItemTypes`, 'GET');

export const createMenuItem = (menuItem, token) =>
    requester(`${baseUrl}/CreateMenuItem`, 'POST', menuItem, token);


export const getAllOfItemType = (token, itemType) =>
    requester(`${baseUrl}/AllItemsByType?itemType=${itemType}`, 'GET', null, token);

const requester = async (url, method = 'GET', body, token) => {
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

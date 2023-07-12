const baseUrl = 'https://localhost:7129/api/Menu';


export const getAllItemTypes = () => requester(`${baseUrl}/AllItemTypes`);

export const createMenuItem = (menuItem, token) => requester(`${baseUrl}/CreateMenuItem`, 'POST', menuItem, token)


const requester = async (url, method = 'GET', body, token) => {
    const res = await fetch(url, createOptions(method, body, token));
    const data = await res.json();

    return data;
}

const createOptions = (method = 'GET', body, token) => {
    const options = {
        method
    }

    if (method === 'GET'){
        return options;
    }

    options.headers = {};
    
    if (token) {
        options.headers['Authorization'] =  `Bearer ${token}`;
    }

    options.headers['Content-Type'] = 'application/json';

    options.body = JSON.stringify(body);

    return options;
}

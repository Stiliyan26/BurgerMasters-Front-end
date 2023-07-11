const baseUrl = 'https://localhost:7129/api/Menu';


export const getAllItemTypes = () => requester(`${baseUrl}/AllItemTypes`);


const requester = async (url, method = 'GET', body) => {
    const res = await fetch(url, createOptions(method, body));
    const data = await res.json();

    return data;
}

const createOptions = (method = 'GET', body) => {
    const options = {
        method
    }

    if (method == 'GET'){
        return options;
    }

    options.headers = {
        'Content-Type': 'application/json'
    };

    options.body = JSON.stringify(body);

    return options;
}

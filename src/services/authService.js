const baseUrl = 'https://localhost:7129/api/Account';

export const register = async (data) => {
    return fetch(`${baseUrl}/Register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(resData => resData.json())
        .then(result => {
            return result;
        });
}

export const login = async (data) => {
    return fetch(`${baseUrl}/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(resData => resData.json())
        .then(result => {
            return result;
        });
}

export const logout = async (token) => {
    await fetch(`${baseUrl}/Logout`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const refreshToken = async (id) => {
    return fetch(`${baseUrl}/RefreshToken?userId=${id}`, {
        method: 'POST'
    })
        .then(resData => resData.json())
        .then(result => {
            return result;
        });
};
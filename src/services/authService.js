import jwtDecode from 'jwt-decode';

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


export const getUserInfo = (token) => {
    const decodedToken = jwtDecode(token);

    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    const birthdate = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth'];
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const jwtExpireDate = decodedToken['exp'];

    return { userId, username, email, birthdate, role, token, jwtExpireDate };
}
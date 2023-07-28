import { createContext, useContext, useEffect } from "react";
import * as authService from '../services/authService'
import useLocalStorage from "../hooks/useLocalStorage";

import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

const initialValue = {
    userId: '',
    username: '',
    email: '',
    birthdate: '',
    role: '',
    token: '',
    jwtExpireDate: ''
};

export const AuthProvider = ({
    children
}) => {
    const [user, setUser] = useLocalStorage('user', initialValue);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            const { token, jwtExpireDate, userId } = user;
            
            if (token) {
                const isTokenExpired = () => {
                    const currentTime = Date.now() / 1000;

                    return jwtExpireDate < currentTime;
                }

                if (isTokenExpired() === true) {
                    authService.refreshToken(userId)
                        .then(res => {
                            if (res.status === 200) {
                                console.log("Token has refreshed!");
                                const decodedToken = jwtDecode(res.refreshToken);

                                setUser(prevState => {
                                    return {
                                        ...prevState,
                                        jwtExpireDate: decodedToken['exp'],
                                        token: res.refreshToken
                                    }
                                })
                                login(user);
                            }
                        })
                } else {
                    console.log("Token is not expired yet!");
                }
            }
        }
    }, []);

    const login = (authData) => {
        setUser(authData);
    }

    const logout = () => {
        setUser(initialValue);
    }

    return (
        <AuthContext.Provider value={
            { user, token: user.token, isAuthenticated: user.email, isAdmin: user.role, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
}
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import * as authService from '../../../services/authService';

const Logout = () => {
    const { logout, user } = useAuthContext();
    const navigate = useNavigate();
    const { token } = user;
    
    useEffect(() => {
        authService.logout(token)
            .then(() => {
                logout();
                navigate("/");
            });
    }, []);
    
    return null;
}

export default Logout;
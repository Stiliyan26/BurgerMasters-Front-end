import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext"

const UserRoute = () => {
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated 
        ? <Outlet />
        : <Navigate to='/login' />
}

export default UserRoute;
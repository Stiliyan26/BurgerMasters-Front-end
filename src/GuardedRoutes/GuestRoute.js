import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext"

const GuestRoute = () => {
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated
        ? <Navigate to='/'/>
        : <Outlet />
}

export default GuestRoute;
import useAuthStatus from "../hooks/useAuthStatus"
import { Navigate, Outlet} from "react-router-dom"

const PrivateRoute = () => {
    const {loggedIn, statusCheck} = useAuthStatus()

    if(statusCheck) {
        return
    }

    return loggedIn? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoute
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { logout, reset  } from "../features/auth/authSlice"


function Header() {

    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }

    return (
        <header className="header">
            <div className="logo">
                <Link to="/"> 
                    Support Desk 
                </Link>
            </div>
            <ul>
                {
                    (user) ? (
                        <li>
                            <Link to="/" onClick={handleClick}> 
                                <FaSignOutAlt/> Logout 
                            </Link>
                        </li>
                    ) : (
                        <>
                        <li>
                            <Link to="/login"> 
                                <FaSignInAlt/> Login 
                            </Link>
                        </li>
                        <li>
                            <Link to="/register"> 
                                <FaUser/> Register 
                            </Link>
                        </li>
                        </>
                    )
                }
            </ul>
        </header>
    )
}

export default Header
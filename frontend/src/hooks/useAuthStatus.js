import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [statusCheck, setStatusCheck] = useState(true)
    const {user} = useSelector(state => state.auth)

    useEffect(()=> {
        if(user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        setStatusCheck(false)
    }, [user])

    return {loggedIn, statusCheck}
}

export default useAuthStatus
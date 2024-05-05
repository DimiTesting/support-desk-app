import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets, reset } from "../features/tickets/ticketSlice"
import { toast } from "react-toastify"

function Tickets() {

    const dispatch = useDispatch()
    const { tickets, isSuccess, isLoading} = useSelector(state => state.ticket)

    useEffect(()=> {
        return () => {
            if(isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(()=> {
        dispatch(getTickets())
    }, [dispatch])

    if(isLoading) {
        return
    }

    return (
        <div>
            <h1>
                Getting the tickets
            </h1>
        </div>
    )
}

export default Tickets
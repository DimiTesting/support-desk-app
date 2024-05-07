import { useSelector, useDispatch } from "react-redux"
import { getTicket } from "../features/tickets/ticketSlice"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { toast } from "react-toastify"

function Ticket() {

    const {ticket, isLoading, isError, message} = useSelector(state=> state.ticket)
    const dispatch = useDispatch()
    const params = useParams()
    const ticketId = params.ticketID

    useEffect(()=> {
        if(isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
    }, [isError, message, ticketId, dispatch])

    if(isLoading) {
        return
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3> Date Submitted {new Date(ticket.createdAt).toLocaleString('en-US')}
                </h3>
                <hr/>
                <div className="ticket-desc">
                    <h3> Description of Issue </h3>
                    <p> {ticket.description} </p>
                </div>
            </header>
        </div>
    )
}

export default Ticket
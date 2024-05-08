import { useSelector, useDispatch } from "react-redux"
import { getTicket, closeTicket } from "../features/tickets/ticketSlice"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { toast } from "react-toastify"

function Ticket() {

    const {ticket, isLoading, isError, message} = useSelector(state=> state.ticket)
    const dispatch = useDispatch()
    const params = useParams()
    const ticketId = params.ticketID
    const navigate = useNavigate()

    useEffect(()=> {
        if(isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
    }, [isError, message, ticketId, dispatch])

    const handleClick = () => {
        dispatch(closeTicket(ticketId))
        toast.success("Ticket has been closed")
        navigate("/tickets")
    }

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
            {ticket.status !== "closed" && (
                <button className="btn btn-block btn-danger" onClick={handleClick}> Close ticket</button>
            )}
        </div>
    )
}

export default Ticket
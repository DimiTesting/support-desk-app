import { useSelector, useDispatch } from "react-redux"
import { getTicket, closeTicket } from "../features/tickets/ticketSlice"
import { getNotes, createNote } from "../features/notes/notesSlice"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import NoteItem from "../components/NoteItem"
import Modal from "react-modal"
import {FaPlus} from "react-icons/fa"

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
  }

  Modal.setAppElement('#root')


function Ticket() {

    const {ticket, isLoading, isError, message} = useSelector(state=> state.ticket)
    const {notes, isLoading: NotesLoading} = useSelector(state=> state.notes)
    const [modalIsOpen, setModalisOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const dispatch = useDispatch()
    const params = useParams()
    const ticketId = params.ticketID
    const navigate = useNavigate()

    useEffect(()=> {
        if(isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
    }, [isError, message, ticketId, dispatch])

    const handleClick = () => {
        dispatch(closeTicket(ticketId))
        toast.success("Ticket has been closed")
        navigate("/tickets")
    }

    if(isLoading || NotesLoading) {
        return
    }

    const openModal = () => {
        setModalisOpen(true)
    }

    const closeModal = () => {
        setModalisOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({noteText, ticketId}))
        .unwrap()
        .then(() => {
          setNoteText('')
          closeModal()
        })
        .catch(toast.error)
        
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
                <h3>Notes</h3>
            </header>

            {ticket.status !== 'closed' && (
                <button className="btn" onClick={openModal}>
                    <FaPlus/> Add note
                </button>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Add Note'
            >
                <h2>Add Note</h2>
                <button className='btn-close' onClick={closeModal}>
                    X
                </button>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <textarea
                            name='noteText'
                            id='noteText'
                            className='form-control'
                            placeholder='Note text'
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}>
                        </textarea>
                    </div>
                    <div className='form-group'>
                        <button className='btn' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>



            {notes.map((note) => (
                <NoteItem id={note._id} note={note} key={note._id}/>
            ))}

            {ticket.status !== "closed" && (
                <button className="btn btn-block btn-danger" onClick={handleClick}> Close ticket</button>
            )}
        </div>
    )
}

export default Ticket
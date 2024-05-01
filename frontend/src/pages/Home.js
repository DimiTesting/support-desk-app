import { Link } from "react-router-dom"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"

function Home() {
    return (
        <>
            <section className="heading">
                <h1> What do you need a help with ? </h1>
                <p> Please choose from below</p>
            </section>

            <Link className="btn btn-reverse btn-block" to="/new-ticket">
                <FaQuestionCircle/> Create a ticket
            </Link>

            <Link className="btn btn-block" to="/tickets">
                <FaTicketAlt/> View my tickets
            </Link>
        </>
    )
}

export default Home
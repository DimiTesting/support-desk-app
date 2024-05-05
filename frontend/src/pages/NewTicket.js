import { useSelector } from "react-redux"
import { useState } from "react"

function NewTicket() {

    const {user} = useSelector(state=>state.auth)

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('Iphone')
    const [description, setDescription] = useState('')

    function handleSubmit(e) {
        console.log("Submitted")
    }

    return (
        <>
            <section className="heading">
                <h1> Create new ticket </h1>
                <p> Please fill out the form below </p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor="name"> Customer Name </label>
                    <input type="text" className="form-control" value={name} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="email"> Customer Email </label>
                    <input type="text" className="form-control" value={email} disabled/>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="product"> Product </label>
                        <select name="product" id="product" value={product} onChange={(e)=> setProduct(e.target.value)}>
                            <option value="iPad"> iPad </option>
                            <option value="iMac"> iMac </option>
                            <option value="iPhone"> iPhone </option>
                            <option value="Mackbook Pro"> Mackbook Pro </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description"> Description of the issue </label>
                        <textarea 
                            name="description" 
                            id="description" 
                            className="form-control" 
                            placeholder="Description..."
                            value={description}
                            onChange={(e)=> {setDescription(e.target.value)}}
                            >
                        </textarea>
                    </div>
                    <div className="from-group">
                        <button className="btn btn-block"> Sumbit </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewTicket
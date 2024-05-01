import { useState } from "react"
import { FaSignInAlt } from "react-icons/fa"

function Login() {

    const [formData, setFormData] = useState({
        email: "", 
        password: "",
    })

    const {email, password} = formData

    function handleChange(e) {
        setFormData((prevState)=> ({
            ...prevState, 
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <>
            <section className="heading">
                <h1> <FaSignInAlt/> Login</h1>
                <p> Please log in to get the support</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email} 
                            placeholder="Email" 
                            onChange={handleChange} 
                            required
                        /> 
                        <input 
                            type="text" 
                            name="password" 
                            id="password" 
                            value={password} 
                            placeholder="Password" 
                            onChange={handleChange} 
                            required
                        /> 
                        <div className="form-group">
                            <button className="btn btn-block"> Sumbit </button>  
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
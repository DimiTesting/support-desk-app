import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"

function Register() {

    const [formData, setFormData] = useState({
        name:"", 
        email: "", 
        password: "",
        password2: ""
    })

    const {name, email, password, password2} = formData

    function handleChange(e) {
        setFormData((prevState)=> ({
            ...prevState, 
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        if(password !== password2) {
            toast.error("Passwords are not matching")
        } else {
            toast.success("Data Submitted")
        }

    }

    return (
        <>
            <section className="heading">
                <h1> <FaUser/> Register</h1>
                <p> Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={name} 
                            placeholder="Name" 
                            onChange={handleChange} 
                            required
                        /> 
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
                        <input 
                            type="text" 
                            name="password2" 
                            id="password2" 
                            value={password2} 
                            placeholder="Confirm Password" 
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

export default Register
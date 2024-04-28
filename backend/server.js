const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT ||5000

const app = express()

app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to support desk API app"})
})

app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})
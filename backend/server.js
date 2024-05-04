const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT ||8000
const colors = require('colors')
const connectDB = require('./config/db')
const {errorHandler} = require('./middlewares/errorMiddleware')

//connecting to the database
connectDB()

const app = express()

app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to support desk API app"})
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use(errorHandler)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})
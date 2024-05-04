const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc GET get current user tickets
// @route /api/tickets
// access private

const getTickets = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error("user not found")
    }

    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

// @desc POST post a new ticket
// @route /api/tickets/create
// access private

const createTickets = asyncHandler(async(req, res)=> {
    const {description, product} = req.body
    const user = await User.findById(req.user.id)

    if(!description || !product) {
        res.status(400)
        throw new Error("Please enter a description or product")
    }

    if(!user) {
        res.status(401)
        throw new Error("User not found, please register first")
    }

    const ticket = await Ticket.create({
        description, 
        product,
        user: req.user.id,
        status: "New"
    })

    res.status(201).json(ticket)
})

module.exports = {getTickets, createTickets}
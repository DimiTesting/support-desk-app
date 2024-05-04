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

// @desc GET get current user's specific ticket
// @route /api/ticket/:id
// access private

const getTicket = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error("user not found")
    }

    const ticket = await Ticket.findById(req.params.id)

    if(ticket.user.toString() !== req.user.id) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    res.status(200).json(ticket)
})

// @description DELETE a ticket
// @route /api/ticket/:id
// access private

const deleteTicket = asyncHandler(async(req, res)=> {
    const user = await User.findById(req.user.id)
    const ticket = await Ticket.findById(req.params.id)

    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }

    if(!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    } 

    await Ticket.findByIdAndDelete(req.params.id)

    res.status(200).json({success: true})

})

// @description UPDATE a ticket
// @route /api/ticket/:id
// access private

const updateTicket = asyncHandler(async(req, res)=> {
    const user = await User.findById(req.user.id)
    const ticket = await Ticket.findById(req.params.id)

    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }

    if(!ticket) {
        res.status(401)
        throw new Error("Ticket not found")
    }

    if(ticket.user.toString()!== req.user.id) {
        res.status(500)
        throw new Error("Not authorized to update this ticket")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(updatedTicket)
})

module.exports = {getTickets, createTickets, getTicket, deleteTicket, updateTicket}
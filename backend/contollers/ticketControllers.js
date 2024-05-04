const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc GET get current user tickets
// @route /api/tickets
// access private

const getTickets = asyncHandler(async(req, res) => {
    res.status(200).json({message: "get tickets"})
})

// @desc POST post a new ticket
// @route /api/tickets/create
// access private

const createTickets = asyncHandler(async(req, res)=> {
    res.status(200).json({message: "create tickets"})
})

module.exports = {getTickets, createTickets}
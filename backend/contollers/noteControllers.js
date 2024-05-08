const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')
const Note = require('../models/noteModel')

//@descr getting notes for the Ticket
//@route /api/tickets/:ticketId/notes
//access Private

const getNotes = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const notes = await Note.find({ticket: req.params.ticketId})

    res.status(200).json(notes)

})

const createNotes = asyncHandler(async(req,res) => {
    
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const notes = await Note.create({
        user: req.user.id, 
        ticket: req.params.ticketId, 
        isStaff: false, 
        text: req.body.text
    })

    res.status(201).json(notes)

})

module.exports = {getNotes, createNotes}
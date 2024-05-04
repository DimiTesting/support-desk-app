const express = require('express')
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')
const {getTickets, createTickets, getTicket, deleteTicket, updateTicket} = require('../contollers/ticketControllers')

router.route("/")
    .get(protect,getTickets)
    .post(protect,createTickets)

router.route("/:id")
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket)

module.exports = router
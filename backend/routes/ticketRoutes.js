const express = require('express')
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')
const {getTickets, createTickets} = require('../contollers/ticketControllers')

router.route("/")
    .get(protect,getTickets)
    .post(protect,createTickets)

module.exports = router
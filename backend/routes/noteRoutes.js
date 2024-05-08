const express = require('express')
const router = express.Router({mergeParams: true})
const {protect} = require('../middlewares/authMiddleware')
const {getNotes, createNotes} = require('../contollers/noteControllers')

router.route('/')
    .get(protect, getNotes)
    .post(protect, createNotes)

module.exports = router
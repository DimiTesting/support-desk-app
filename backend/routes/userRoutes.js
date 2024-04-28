const express = require('express')
const router = express.Router()
const {registerUser, loginUser} = require("../contollers/userControllers")

router.post("/", registerUser)
router.post("/login", loginUser)

module.exports = router
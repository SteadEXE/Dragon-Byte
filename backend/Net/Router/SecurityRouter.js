const express = require('express')
const Router = express.Router()
const SecurityController = require('../Controller/SecurityController')

Router.post('/api/auth', SecurityController.auth)

module.exports = Router
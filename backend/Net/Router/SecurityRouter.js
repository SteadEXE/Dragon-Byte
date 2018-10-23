const express = require('express')
const Router = express.Router()
const SecurityController = require('../Controller/SecurityController')

Router.post('/api/auth', SecurityController.auth)
Router.post('/api/register', SecurityController.register)

module.exports = Router
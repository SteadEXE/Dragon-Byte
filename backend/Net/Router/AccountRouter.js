const express = require('express')
const Router = express.Router()
const AccountController = require('../Controller/AccountController')

Router.post('/api/account/nickname', AccountController.changeNickname)
Router.post('/api/account/password', AccountController.changePassword)

module.exports = Router
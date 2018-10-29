const express = require('express')
const Router = express.Router()
const AccountController = require('../Controller/AccountController')

Router.post('/api/account/nickname', AccountController.changeNickname)

module.exports = Router
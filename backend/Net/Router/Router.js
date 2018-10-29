const express = require('express')
const Router = express.Router()
const SecurityRouter = require('./SecurityRouter')
const AccountRouter = require('./AccountRouter')

Router.use(SecurityRouter)
Router.use(AccountRouter)

module.exports = Router
const express = require('express')
const Router = express.Router()
const SecurityRouter = require('./SecurityRouter')

Router.use(SecurityRouter)

module.exports = Router
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    key: String,
    value: String
})

module.exports = mongoose.model('Parameter', Schema)
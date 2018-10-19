const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    username: String,
    password: String,
    token: String,
    email: String,
    experience: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', Schema)
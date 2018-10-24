const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    username: String,
    nickname: String,
    password: String,
    token: String,
    email: String,
    session: String,
    experience: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    latitude: Number,
    longitude: Number
})

module.exports = mongoose.model('User', Schema)
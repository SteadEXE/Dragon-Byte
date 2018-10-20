const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    videoId: String,
    title: String,
    played: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Track', Schema)
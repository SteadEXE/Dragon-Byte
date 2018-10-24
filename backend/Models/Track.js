const mongoose = require('mongoose')
const Track = require('../Entity/Track')

const Schema = new mongoose.Schema({
    videoId: String,
    title: String,
    played: {
        type: Number,
        default: 0
    }
})

Schema.loadClass(Track)

module.exports = mongoose.model('Track', Schema)
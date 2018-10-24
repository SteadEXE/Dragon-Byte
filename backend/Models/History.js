const mongoose = require('mongoose')
const History = require('../Entity/History')

const Schema = new mongoose.Schema({
    track: {
        ref: 'Track',
        type: mongoose.Schema.Types.ObjectId
    },
    owner: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }
})

Schema.loadClass(History)

module.exports = mongoose.model('History', Schema)
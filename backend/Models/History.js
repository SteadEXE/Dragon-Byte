const mongoose = require('mongoose')

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

module.exports = mongoose.model('History', Schema)
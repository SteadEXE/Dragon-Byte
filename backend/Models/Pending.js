const mongoose = require('mongoose')
const Pending = require('../Entity/Pending')

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

Schema.loadClass(Pending)

module.exports = mongoose.model('Pending', Schema)
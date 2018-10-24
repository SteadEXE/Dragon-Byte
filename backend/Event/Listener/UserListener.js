const Emitter = require('../Emitter/UserEmitter')
const User = require('../../Models/User')
const Sockets = require('../../Net/Sockets')

class UserListener {
    constructor () {
        Emitter.on('users/update', async user => {
            Sockets.to(socket.token).emit('')
        })
    }
}

module.exports = new UserListener()
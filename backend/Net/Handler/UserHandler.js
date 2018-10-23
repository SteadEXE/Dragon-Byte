const crypto = require('crypto')
const Sockets = require('../Sockets')
const User = require('../../Models/User')

class UserHandler {
    async handle (socket) {
        const user = await User.findOne({ token: socket.token })
        
        socket.emit('account/update', {
            nickname: user.username,
            experience: user.experience
        })

        socket.on('disconnect', async () => {
            await User.findOneAndUpdate({
                token: socket.token
            }, {
                session: ''
            })
        })

        this.broadcastOnline(socket)
    }

    async broadcastOnline (socket = Socket.io) {
        let users = await User.find({ session: Sockets.session })

        users = users.map(user => {
            return {
                nickname: user.username,
                experience: user.experience
            }
        })

        socket.emit('users/online', users)
    }
}

module.exports = new UserHandler()
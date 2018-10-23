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
    }
}

module.exports = new UserHandler()
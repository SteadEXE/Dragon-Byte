const Sockets = require('../Sockets')
const User = require('../../Models/User')
const OnlinePacket = require('../Packet/Users/OnlineUsersPacket')
const AccountUpdatePacket = require('../Packet/Account/AccountUpdatePacket')

class UserHandler {
    async handle (socket) {
        const user = await User.findOne({ token: socket.token })
        const packet = new AccountUpdatePacket(user)

        socket.emit(packet.name(), packet.payload())

        socket.on('player/join', async () => {
            this.broadcastOnline()
        })

        socket.on('account/position', async (latitude, longitude) => {
            await User.findOneAndUpdate({ token: socket.token }, {
                latitude: latitude,
                longitude: longitude
            })
        })

        socket.on('disconnect', async () => {
            let room = Sockets.io.nsps['/'].adapter.rooms[socket.token]

            if (!room) {
                await User.findOneAndUpdate({ token: socket.token }, { session: '' })

                this.broadcastOnline()
            }
        })
    }

    async broadcastOnline () {
        let users = await User.find({ session: Sockets.session })
        let packet = new OnlinePacket(users)

        Sockets.io.emit(packet.name(), packet.payload())
    }
}

module.exports = new UserHandler()
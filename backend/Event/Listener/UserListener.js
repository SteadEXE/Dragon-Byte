const Emitter = require('../Emitter/UserEmitter')
const User = require('../../Models/User')
const Sockets = require('../../Net/Sockets')
const AccountUpdatePacket = require('../../Net/Packet/Account/AccountUpdatePacket')
const OnlineUsersPacket = require('../../Net/Packet/Users/OnlineUsersPacket')

class UserListener {
    constructor () {
        Emitter.on('experience/tick', this.onExperienceTick)
    }

    async onExperienceTick (user) {
        // Compute luck
        let luck = Math.floor(Math.random() * 10000) / 100
        let amount = 0

        if (luck < 0.1) {
            amount = Math.floor(Math.random() * 500) + 250
        } else if (luck < 1) {
            amount = Math.floor(Math.random() * 50) + 25
        } else if (luck < 10) {
            amount = Math.floor(Math.random() * 5) + 5
        } else {
            amount = Math.floor(Math.random() * 3) + 2
        }

        // Update user and broadcast it.
        user = await User.findOneAndUpdate({ token: user.token }, { $inc: {
            experience: amount,
            points: amount
        } }, { new: true })

        let accountPacket = new AccountUpdatePacket(user)

        Sockets.io.to(user.token).emit(accountPacket.name(), accountPacket.payload())

        // Broadcast onlines users.
        let users = await User.find({ session: Sockets.session })
        let packet = new OnlineUsersPacket(users)

        Sockets.io.emit(packet.name(), packet.payload())
    }
}

module.exports = new UserListener()
const crypto = require('crypto')
const Sockets = require('../Sockets')
const User = require('../../Models/User')
const Player = require('../../Player/Player')
const OnlinePacket = require('../Packet/Users/OnlineUsersPacket')
const AccountUpdatePacket = require('../Packet/Account/AccountUpdatePacket')

class UserHandler {
    constructor () {
        // Gives experience to user when player is playing his track.
        Player.on('progress', async () => {
            if (Player.updated > 0) {
                let amount = Math.round((Date.now() - Player.updated) / 1000)

                if (amount >= 10) {
                    Player.updated = Date.now()
                    
                    await User.findByIdAndUpdate(Player.current.owner.id, {
                        $inc: { 
                            experience: amount, 
                            point: amount
                        }
                    })

                    this.broadcastOnline()
                }
            }
        })
    }
    async handle (socket) {
        const user = await User.findOne({ token: socket.token })
        const packet = new AccountUpdatePacket(user)
        
        socket.emit(packet.name(), packet.payload())

        socket.on('disconnect', async () => {
            let room = Sockets.io.nsps['/'].adapter.rooms[socket.token]

            if (!room) {
                await User.findOneAndUpdate({ token: socket.token }, { session: '' })

                this.broadcastOnline()
            }
        })

        this.broadcastOnline()
    }

    async broadcastOnline () {
        let users = await User.find({ session: Sockets.session })
        let packet = new OnlinePacket(users)

        Sockets.io.emit(packet.name(), packet.payload())
    }
}

module.exports = new UserHandler()
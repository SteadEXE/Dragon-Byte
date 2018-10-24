const crypto = require('crypto')
const Sockets = require('../Sockets')
const User = require('../../Models/User')
const Player = require('../../Player/Player')

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

            this.broadcastOnline()
        })

        this.broadcastOnline()
    }

    async broadcastOnline () {
        let users = await User.find({ session: Sockets.session })

        users = users.map(user => {
            return {
                nickname: user.username,
                experience: user.experience
            }
        })

        Sockets.io.emit('users/online', users)
    }
}

module.exports = new UserHandler()
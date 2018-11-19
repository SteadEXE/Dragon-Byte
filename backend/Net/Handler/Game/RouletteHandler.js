const User = require('../../../Models/User')
const Roulette = require('../../../Game/Roulette/Roulette')
const Bet = require('../../../Game/Roulette/Bet')
const StatusPacket = require('../../Packet/Game/Roulette/RouletteStatusPacket')

class RouletteHandler {
    handle (socket) {
        socket.on('roulette/join', () => {
            socket.join('roulette')

            // Send state of roulette.
            const packet = new StatusPacket(Roulette)
            socket.emit(packet.name(), packet.payload())
        })

        socket.on('roulette/deposit', async payload => {
            let user = await User.findOne({ token: socket.token })
        })

        socket.on('roulette/leave', () => {
            socket.leave('roulette')
        })
    }
}

module.exports = new RouletteHandler()
const Roulette = require('../../../Game/Roulette/Roulette')
const StatusPacket = require('../../Packet/Game/Roulette/RouletteStatusPacket')

class RouletteHandler {
    handle (socket) {
        socket.on('roulette/join', () => {
            socket.join('roulette')

            // Send state of roulette.
            const packet = new StatusPacket(Roulette)
            socket.emit(packet.name(), packet.payload())
        })

        socket.on('roulette/leave', () => {
            socket.leave('roulette')
        })
    }
}

module.exports = new RouletteHandler()
const Sockets = require('../Sockets')
const Player = require('../../Player/Player')
const Updates = require('../../Player/Constants/Updates')
const States = require('../../Player/Constants/States')
const PlayerStatusPacket = require('../Packet/Player/PlayerStatusPacket')

class PlayerHandler {
    handle (socket) {
        socket.on('player/join', () => {
            this.broadcastUpdate(socket)
        })

        socket.on('player/next', () => {
            if (Player.status.state === States.PLAYING) {
                Player.next()
            }
        })
    }

    broadcastUpdate (socket) {
        let packet = new PlayerStatusPacket(Updates.FULL, Player.status)

        socket.emit(packet.name(), packet.payload())
    }
}

module.exports = new PlayerHandler()
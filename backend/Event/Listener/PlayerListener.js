const PlayerEmitter = require('../Emitter/PlayerEmitter')
const PlayerStatusPacket = require('../../Net/Packet/Player/PlayerStatusPacket')
const Sockets = require('../../Net/Sockets')

class PlayerListener {
    constructor () {
        PlayerEmitter.on('update', this.onPlayerUpdate)
    }

    onPlayerUpdate (type, status) {
        let packet = new PlayerStatusPacket(type, status)

        Sockets.io.emit(packet.name(), packet.payload())
    }
}

module.exports = new PlayerListener()
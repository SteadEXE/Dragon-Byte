const PlayerEmitter = require('../Emitter/PlayerEmitter')
const HistoryEmitter = require('../Emitter/HistoryEmitter')
const PlayerStatusPacket = require('../../Net/Packet/Player/PlayerStatusPacket')
const Sockets = require('../../Net/Sockets')

class PlayerListener {
    constructor () {
        PlayerEmitter.on('update', this.onPlayerUpdate)
        PlayerEmitter.on('play', this.onPlayerPlay)
    }

    onPlayerUpdate (type, status) {
        // Send player status.
        let packet = new PlayerStatusPacket(type, status)
        Sockets.io.emit(packet.name(), packet.payload())
    }

    onPlayerPlay () {
        HistoryEmitter.emit('history/all')
    }
}

module.exports = new PlayerListener()
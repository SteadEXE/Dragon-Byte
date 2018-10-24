const Sockets = require('../../Net/Sockets')
const History = require('../../Models/History')
const HistoryEmitter = require('../Emitter/HistoryEmitter')
const HistoryPacket = require('../../Net/Packet/History/HistoryPacket')

class HistoryListener {
    constructor () {
        HistoryEmitter.on('history/all', this.broadcastHistory)
    }

    async broadcastHistory (socket = Sockets.io) {
        let tracks = await History.find({})
            .sort({ _id: '-1' })
            .populate('track')
            .populate('owner')
            .limit(25)

        let packet = new HistoryPacket(tracks)

        socket.emit(packet.name(), packet.payload())
    }
}

module.exports = new HistoryListener()
const Sockets = require('../../Net/Sockets')
const Pending = require('../../Models/Pending')
const QueueEmitter = require('../Emitter/QueueEmitter')

class QueueListener {
    constructor () {
        QueueEmitter.on('queue/all', this.broadcastQueue)
    }

    async broadcastQueue (socket = Sockets.io) {
        let pendings = await Pending.find({})
            .populate('track')
            .populate('owner')
        
        pendings = pendings.map(pending => {
            return pending.export()
        })

        socket.emit('queue/all', pendings)
    }
}

module.exports = new QueueListener()
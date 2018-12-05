const HistoryListener = require('../../Event/Listener/HistoryListener')

class HistoryHandler {
    handle (socket) {
        socket.on('player/join', () => {
            HistoryListener.broadcastHistory(socket)
        })
    }
}

module.exports = new HistoryHandler()
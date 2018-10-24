const HistoryListener = require('../../Event/Listener/HistoryListener')

class HistoryHandler {
    handle (socket) {
        HistoryListener.broadcastHistory(socket)
    }
}

module.exports = new HistoryHandler()
class HistoryPacket {
    constructor (histories) {
        this.histories = histories.map(history => {
            return history.export()
        })
    }

    name () {
        return 'history/all'
    }

    payload () {
        return this.histories
    }
}

module.exports = HistoryPacket
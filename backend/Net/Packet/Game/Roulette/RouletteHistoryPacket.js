class RouletteHistoryPacket {
    constructor (roulette) {
        this.roulette = roulette
    }

    name () {
        return 'roulette/history'
    }

    payload () {
        return this.roulette.history
    }
}

module.exports = RouletteHistoryPacket
class RouletteStatusPacket {
    constructor (roulette) {
        this.roulette = roulette
    }

    name () {
        return 'roulette/status'
    }

    payload () {
        return {
            status: this.roulette.status,
            offset: this.roulette.offset,
            remaining: this.roulette.end - Date.now()
        }
    }
}

module.exports = RouletteStatusPacket
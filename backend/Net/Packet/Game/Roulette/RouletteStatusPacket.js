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
            origin: this.roulette.origin,
            slot: this.roulette.slot,
            remaining: this.roulette.end - Date.now()
        }
    }
}

module.exports = RouletteStatusPacket
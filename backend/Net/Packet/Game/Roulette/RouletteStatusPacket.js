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
            remaining: this.roulette.end - Date.now(),
            jackpot: Math.floor(this.roulette.jackpot),
            earnings: this.roulette.earnings,
            losses: this.roulette.losses
        }
    }
}

module.exports = RouletteStatusPacket
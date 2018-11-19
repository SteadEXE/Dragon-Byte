class RouletteBetsPacket {
    constructor (roulette) {
        this.roulette = roulette
    }

    name () {
        return 'roulette/bets'
    }

    payload () {
        let payload = { }

        for (let type in this.roulette.bets) {
            if (!payload.hasOwnProperty(type)) {
                payload[type] = []
            }

            for (let bet in this.roulette.bets[type]) {
                payload[type].push(this.roulette.bets[type][bet].export())
            }
        }

        return payload
    }
}

module.exports = RouletteBetsPacket
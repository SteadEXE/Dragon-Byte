const Sockets = require('../../Net/Sockets')
const StatusPacket = require('../../Net/Packet/Game/Roulette/RouletteStatusPacket')
const Slots = require('./Slots')

const States = {
    BET: 'bet',
    SPINNING: 'spinning',
    REWARD: 'reward'
}

class Roulette {
    constructor () {
        this.status = States.BET
        this.end = Date.now()
        this.offset = 0

        setTimeout(this.spin.bind(this), 15 * 1000)
    }

    spin () {
        this.offset %= Math.PI * 2 // Lower the offset value to the minimum
        this.offset += (Math.PI * 4) + (Math.random() * (Math.PI * 2)) // Two turn + one random
        this.status = States.SPINNING
        this.end = Date.now() + 15e3

        // Emit packet to everyone
        let packet = new StatusPacket(this)
        Sockets.io.to('roulette').emit(packet.name(), packet.payload())

        setTimeout(this.reward.bind(this), 15 * 1000)
    }

    reward () {
        this.status = States.REWARD
        this.end = Date.now() + 5e3

        let arc = (Math.PI * 2) / Slots.length // Angle par case.
        let picked = Math.floor(this.offset / arc) // Offset c'est l'angle de la roulette
        let index = 37 - (picked % Slots.length)

        // Emit packet to everyone
        let packet = new StatusPacket(this)
        Sockets.io.to('roulette').emit(packet.name(), packet.payload())

        setTimeout(this.bet.bind(this), 5e3)
    }

    bet () {
        this.status = States.BET
        this.end = Date.now() + 10e3

        // Emit packet to everyone
        let packet = new StatusPacket(this)
        Sockets.io.to('roulette').emit(packet.name(), packet.payload())

        setTimeout(this.spin.bind(this), 10e3)
    }
}

module.exports = new Roulette()
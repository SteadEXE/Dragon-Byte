const User = require('../../Models/User')
const Sockets = require('../../Net/Sockets')
const Slots = require('./Slots')
const StatusPacket = require('../../Net/Packet/Game/Roulette/RouletteStatusPacket')
const BetsPacket = require('../../Net/Packet/Game/Roulette/RouletteBetsPacket')
const AccountUpdatePacket = require('../../Net/Packet/Account/AccountUpdatePacket')

const States = {
    BET: 'bet',
    SPINNING: 'spinning',
    REWARD: 'reward'
}

class Roulette {
    constructor () {
        this.status = States.BET
        this.end = Date.now() + 15e3
        this.offset = 0
        this.origin = 0
        this.slot = 0

        this.bets = {
            black: { },
            red: { },
            green: { }
        }

        setTimeout(this.spin.bind(this), 15 * 1000)
    }

    async spin () {
        this.offset %= Math.PI * 2 // Lower the offset value to the minimum
        this.offset += (Math.PI * 4) + (Math.random() * (Math.PI * 2)) // Two turn + one random
        this.status = States.SPINNING
        this.end = Date.now() + 15e3

        // Emit packet to everyone
        let packet = new StatusPacket(this)
        Sockets.io.to('roulette').emit(packet.name(), packet.payload())

        setTimeout(this.reward.bind(this), 15 * 1000)
    }

    async reward () {
        this.status = States.REWARD
        this.end = Date.now() + 5e3

        this.origin = this.offset % (Math.PI * 2)

        let arc = (Math.PI * 2) / Slots.length // Angle par case.
        let picked = Math.floor(this.offset / arc) // Offset c'est l'angle de la roulette
        let index = 37 - (picked % Slots.length) - 1
        let slot = Slots[index]

        this.slot = index

        // Compute rewards.
        for (let type in this.bets) {
            for (let token in this.bets[type]) {
                let bet = this.bets[type][token]

                // Compute gain for each bet.
                if (bet.type === slot.color) {
                    let multiplier = 2

                    if (slot.color === 'green') {
                        multiplier = 36
                    }

                    this.bets[type][token].gain = bet.amount * multiplier
                } else {
                    this.bets[type][token].gain = -bet.amount
                }

                // Update balance for each users if they gained points.
                if (this.bets[type][token].gain > 0) {
                    let user = await User.findOneAndUpdate({
                        token: bet.user.token
                    }, {
                        $inc: { points: bet.gain }
                    }, { new: true })

                    if (user !== null) {
                        let accountUpdatePacket = new AccountUpdatePacket(user)

                        Sockets.io.to(user.token).emit(accountUpdatePacket.name(), accountUpdatePacket.payload())
                    }
                }
            }
        }

        // Emit packet to everyone
        let statusPacket = new StatusPacket(this)
        let betsPacket = new BetsPacket(this)

        Sockets.io.to('roulette').emit(statusPacket.name(), statusPacket.payload())
        Sockets.io.to('roulette').emit(betsPacket.name(), betsPacket.payload())

        setTimeout(this.bet.bind(this), 5e3)
    }

    async bet () {
        // Delete bets from last round
        for (let type in this.bets) {
            for (let token in this.bets[type]) {
                delete this.bets[type][token]
            }
        }

        this.status = States.BET
        this.end = Date.now() + 10e3

        // Emit packet to everyone
        let statusPacket = new StatusPacket(this)
        let betsPacket = new BetsPacket(this)

        Sockets.io.to('roulette').emit(statusPacket.name(), statusPacket.payload())
        Sockets.io.to('roulette').emit(betsPacket.name(), betsPacket.payload())

        setTimeout(this.spin.bind(this), 10e3)
    }
}

module.exports = new Roulette()
const User = require('../../Models/User')
const Sockets = require('../../Net/Sockets')
const Slots = require('./Slots')
const Parameter = require('../../Models/Parameter')
const StatusPacket = require('../../Net/Packet/Game/Roulette/RouletteStatusPacket')
const BetsPacket = require('../../Net/Packet/Game/Roulette/RouletteBetsPacket')
const AccountUpdatePacket = require('../../Net/Packet/Account/AccountUpdatePacket')

const States = {
    BET: 'bet',
    SPINNING: 'spinning',
    REWARD: 'reward'
}

const JackpotTreshold = 100000

class Roulette {
    constructor () {
        this.status = States.BET
        this.end = Date.now() + 15e3
        this.offset = 0
        this.origin = 0
        this.slot = 0

        this.jackpot = 0
        this.earnings = 0
        this.losses = 0

        this.bets = {
            black: { },
            red: { },
            green: { }
        }

        this.init()
    }

    async init () {
        this.jackpot = parseFloat(await Parameter.findOne({ key: 'roulette/jackpot' }).value || 0)
        this.earnings = parseFloat(await Parameter.findOne({ key: 'roulette/earnings' }).value || 0)
        this.losses = parseFloat(await Parameter.findOne({ key: 'roulette/losses' }).value || 0)

        let packet = new StatusPacket(this)
        Sockets.io.to('roulette').emit(packet.name(), packet.payload())

        setTimeout(this.spin.bind(this), 15 * 1000)
    }

    async spin () {
        this.offset %= Math.PI * 2 // Lower the offset value to the minimum
        this.offset += (Math.PI * 4) + (Math.random() * (Math.PI * 2)) // Two turn + one random
        this.status = States.SPINNING
        this.end = Date.now() + 15e3

        // Save jackpot, earnings and losses.
        await Parameter.findOneAndUpdate({ key: 'roulette/jackpot' }, { value: this.jackpot }, { upsert: true })
        await Parameter.findOneAndUpdate({ key: 'roulette/earnings' }, { value: this.earnings }, { upsert: true })
        await Parameter.findOneAndUpdate({ key: 'roulette/losses' }, { value: this.losses }, { upsert: true })

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

        let jackpotWinner = null

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
                    // Convert 1% of gain in experience.
                    let experience = Math.floor(bet.gain * 0.01)

                    let user = await User.findOneAndUpdate({
                        token: bet.user.token
                    }, {
                        $inc: {
                            points: bet.gain,
                            experience: experience
                        }
                    }, { new: true })

                    if (user !== null) {
                        let accountUpdatePacket = new AccountUpdatePacket(user)

                        Sockets.io.to(user.token).emit(accountUpdatePacket.name(), accountUpdatePacket.payload())
                    }
                }

                // Check for jackpot
                if (this.jackpot > 0) {
                    let luck = (1 - Math.pow(0.99, (bet.amount / JackpotTreshold))) * 100
                    let rand = Math.floor(Math.random() * 100)

                    if (rand <= luck) {
                        jackpotWinner = bet.user.token
                    }
                }
            }
        }

        if (jackpotWinner !== null) {
            let winnersPool = this.jackpot * 0.20
            let losersPool = this.jackpot * 0.10

            let winners = 0
            let losers = 0

            // Count winners and losers.
            for (let type in this.bets) {
                for (let token in this.bets[type]) {
                    if (token !== jackpotWinner) {
                        if (this.bets[type][token].gain > 0) {
                            winners++
                        } else {
                            losers++
                        }
                    }
                }
            }

            // Give them some money and experience.
            for (let type in this.bets) {
                for (let token in this.bets[type]) {
                    let amount = 0
                    let experience = 0

                    // Compute amount of jackpot's gain
                    if (token !== jackpotWinner) {
                        if (this.bets[type][token].gain > 0) {
                            amount = Math.round(winnersPool / winners)
                        } else {
                            amount = Math.round(losersPool / losers)
                        }
                    } else {
                        amount = Math.round(this.jackpot * 0.70)
                    }

                    // Update bets so summary is accurate after a jackpot is won.
                    this.bets[type][token].gain += amount

                    experience = Math.round(amount * 0.01)

                    // Finally update the user.
                    let user = await User.findOneAndUpdate({
                        token: bet.user.token
                    }, {
                        $inc: {
                            points: amount,
                            experience: experience
                        }
                    }, { new: true })
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
        this.end = Date.now() + 15e3

        // Emit packet to everyone
        let statusPacket = new StatusPacket(this)
        let betsPacket = new BetsPacket(this)

        Sockets.io.to('roulette').emit(statusPacket.name(), statusPacket.payload())
        Sockets.io.to('roulette').emit(betsPacket.name(), betsPacket.payload())

        setTimeout(this.spin.bind(this), 15e3)
    }
}

module.exports = new Roulette()
const Sockets = require('../../Sockets')
const User = require('../../../Models/User')
const Roulette = require('../../../Game/Roulette/Roulette')
const Bet = require('../../../Game/Roulette/Bet')
const StatusPacket = require('../../Packet/Game/Roulette/RouletteStatusPacket')
const BetsPacket = require('../../Packet/Game/Roulette/RouletteBetsPacket')
const AccountUpdatePacket = require('../../Packet/Account/AccountUpdatePacket')

class RouletteHandler {
    handle (socket) {
        socket.on('roulette/join', () => {
            socket.join('roulette')

            // Send state of roulette.
            const statusPacket = new StatusPacket(Roulette)
            const betsPacket = new BetsPacket(Roulette)

            socket.emit(statusPacket.name(), statusPacket.payload())
            socket.emit(betsPacket.name(), betsPacket.payload())
        })

        socket.on('roulette/deposit', async payload => {
            // Prevent user from betting if roulette is not in bet mode.
            if (Roulette.status !== 'bet') {
                return
            }

            // Find a user and update its balance.
            let user = await User.findOneAndUpdate({
                token: socket.token,
                points: { $gte: payload.amount }
            }, {
                $inc: {
                    points: -payload.amount
                }
            }, { new : true })

            // User has not enough points.
            if (user === null) {
                return
            }

            // Create a bet or update one if already exists.
            let bet = Roulette.bets[payload.type][socket.token]

            if (bet !== undefined) {
                bet.amount += parseInt(payload.amount, 10)
            } else {
                bet = new Bet(user, payload.type, parseInt(payload.amount, 10))
            }

            Roulette.bets[payload.type][socket.token] = bet

            // Increase jackpot by 1% of bet.
            Roulette.jackpot += bet.amount * 0.01

            // Broadcast bets.
            let betsPacket = new BetsPacket(Roulette)
            let accountUpdatePacket = new AccountUpdatePacket(user)
            let statusPacket = new StatusPacket(Roulette)

            Sockets.io.to(user.token).emit(accountUpdatePacket.name(), accountUpdatePacket.payload())
            Sockets.io.to('roulette').emit(betsPacket.name(), betsPacket.payload())
            Sockets.io.to('roulette').emit(statusPacket.name(), statusPacket.payload())
        })

        socket.on('roulette/leave', () => {
            socket.leave('roulette')
        })
    }
}

module.exports = new RouletteHandler()
const Player = require('../../Player/Player')
const Sockets = require('../Sockets')
const History = require('../../Models/History')

class HistoryHandler {
    constructor () {
        Player.on('update', () => {
            this.broadcastHistory()
        })
    }

    handle (socket) {
        this.broadcastHistory(socket)
    }

    async broadcastHistory(socket = Sockets.io) {
        let histories = await History.find({})
                                    .sort({ _id: '-1' })
                                    .populate('track')
                                    .populate('owner')
                                    .limit(25)

        histories = histories.map(({ track, owner }) => {
            return {
                track: {
                    title: track.title,
                    played: track.played
                },
                owner: {
                    nickname: owner.username,
                    experience: owner.experience
                }
            }
        })

        socket.emit('history/tracks', histories)
    }
}

module.exports = new HistoryHandler()
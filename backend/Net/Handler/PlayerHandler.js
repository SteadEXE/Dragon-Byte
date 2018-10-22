const Sockets = require('../Sockets')
const Player = require('../../Player/Player')
const Updates = require('../../Player/Constants/Updates')

class PlayerHandler {
    constructor () {
        // Everytime player is updated, broadcast changes to clients.
        Player.on('update', (type) => {
            this.broadcastUpdate(type)
        })
    }

    handle (socket) {
        this.broadcastUpdate(Updates.FULL, socket)
    }

    broadcastUpdate (type, socket = Sockets.io) {
        if (Player.current === null) {
            return
        }

        let packet = { }

        switch (type) {
            case Updates.FULL:
                packet = {
                    state: Player.state,
                    track: {
                        title: Player.current.track.title,
                        duration: Player.duration,
                        elapsed: Player.elapsed
                    },
                    owner: {
                        nickname: Player.current.owner.username,
                        experience: Player.current.owner.experience
                    }
                }
                break
            case Updates.STATE:
                packet.state = Player.state
                break
            case Updates.UPDATE:
                packet.track = {
                    title: Player.current.track.title,
                    duration: Player.duration,
                    elapsed: Player.elapsed
                }
                break
        }

        socket.emit('player/status', packet)
    }
}

module.exports = new PlayerHandler()
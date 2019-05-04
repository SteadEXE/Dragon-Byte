const Kaboom = require('../../../Game/Kaboom/Kaboom')

class KaboomHandler {
    handle (socket) {
        socket.on('kaboom/join', () => {
            socket.join('kaboom')
        })

        socket.on('kaboom/leave', () => {
            socket.leave('kaboom')
        })
    }
}

module.exports = new KaboomHandler()
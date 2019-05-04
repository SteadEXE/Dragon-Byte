const Sockets = require('../../Net/Sockets')
const PlayersPacket = require('../../Net/Packet/Game/Kaboom/KaboomPlayersPacket')

class Kaboom {
    constructor () {
        this.players = [{
            name: 'Stead',
            status: 'alive',
        }, {
            name: 'Vort',
            status: 'alive',
        }, {
            name: 'Wayo',
            status: 'dead'
        }]

        this.init()
    }

    init () {
        let playersPacket = new PlayersPacket(this)
        Sockets.io.to('kaboom').emit(playersPacket.name(), playersPacket.payload())
    }
}

module.exports = new Kaboom()
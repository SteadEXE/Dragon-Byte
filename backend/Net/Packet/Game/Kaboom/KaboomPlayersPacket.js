class KaboomPlayersPacket {
    constructor (kaboom) {
        this.players = kaboom.players
    }

    name () {
        return 'kaboom/players'
    }

    payload () {
        return {
            players: this.players
        }
    }
}
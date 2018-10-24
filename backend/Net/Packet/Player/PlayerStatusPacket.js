const Updates = require('../../../Player/Constants/Updates')

class PlayerUpdatePacket {
    constructor (type, status) {
        this.type = type
        this.status = status
    }

    name () {
        return 'player/status'
    }

    payload () {
        let packet = { }

        switch (this.type) {
            case Updates.FULL:
                packet.state = this.status.state

                if (this.status.current) {
                    packet.track = {
                        title: this.status.current.track.title,
                        duration: this.status.duration,
                        elapsed: this.status.elapsed
                    }

                    packet.owner = this.status.current.owner.export()
                }

                return packet
            case Updates.STATE:
                return { state: this.status.state }
            case Updates.UPDATE:
                if (this.status.current) {
                    packet.track = {
                        title: this.status.current.track.title,
                        duration: this.status.duration,
                        elapsed: this.status.elapsed
                    }
                } else {
                    packet.track = null
                }
                
                return packet
        }
    }
}

module.exports = PlayerUpdatePacket
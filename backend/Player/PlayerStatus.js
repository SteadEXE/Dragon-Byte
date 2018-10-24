const States = require('./Constants/States')

class PlayerStatus {
    constructor () {
        this.current = null
        this.state = States.IDLE

        this.elapsed = 0
        this.duration = 0

        this.updated = 0
    }

    export () {
        return {
            current: this.current,
            state: this.state,
            elapsed: this.elapsed,
            duration: this.duration,
            updated: this.updated
        }
    }
}

module.exports = PlayerStatus
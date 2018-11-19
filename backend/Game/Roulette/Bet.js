class Bet {
    constructor (user, type, amount) {
        this.user = user
        this.type = type
        this.amount = amount
        this.gain = 0
    }

    export () {
        return {
            user: this.user.export(),
            type: this.type,
            amount: this.amount,
            gain: this.gain
        }
    }
}

module.exports = Bet
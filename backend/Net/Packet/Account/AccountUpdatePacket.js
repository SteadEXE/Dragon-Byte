class AccountUpdatePacket {
    constructor (user) {
        this.user = user
    }

    name () {
        return 'account/update'
    }

    payload () {
        return this.user.export()
    }
}

module.exports = AccountUpdatePacket
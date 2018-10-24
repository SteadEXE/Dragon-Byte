class AccountUpdatePacket {
    constructor (user) {
        this.user = user.export()
    }

    name () {
        return 'account/update'
    }

    payload () {
        return this.user
    }
}

module.exports = AccountUpdatePacket
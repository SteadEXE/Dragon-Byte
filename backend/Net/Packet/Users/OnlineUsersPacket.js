class OnlinePacket {
    constructor (users) {
        this.users = users.map(user => {
            return user.export()
        })
    }

    name () {
        return 'users/online'
    }

    payload () {
        return this.users
    }
}

module.exports = OnlinePacket
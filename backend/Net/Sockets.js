const crypto = require('crypto')

module.exports = {
    io: null,
    sockets: [ ],
    // Used to keep track of connected users.
    session: crypto.randomBytes(8).toString('hex')
}
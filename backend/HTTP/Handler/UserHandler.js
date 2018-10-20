const crypto = require('crypto')
const User = require('../../Models/User')

class UserHandler {
    handle (socket) {
        // Authentification
        socket.on('authentificate', async (username, password, email) => {
            const hash = crypto.createHash('sha256')
            hash.update(password)
            password = hash.digest('hex')

            let user = null

            if (email !== '') {
                // This is a registration packet.
                user = await User.findOne({ 
                    $or: [
                        { username: username },
                        { email: email }
                    ]
                })

                if (user !== null) {
                    // An account already exists with this username or mail.
                    socket.emit('authentification', {
                        status: 'ERR',
                        message: 'Cette email ou ce nom de compte est déjà utilisé.'
                    })

                    return
                }

                const token = crypto.randomBytes(64).toString('hex')

                user = new User({
                    username: username,
                    password: password,
                    email:  email,
                    token: token
                })

                await user.save()
            }

            if (email === '') {
                // This is a login packet.
                user = await User.findOne({
                    username: username,
                    password: password
                })

                if (user === null) {
                    // No account has been found with this username/password.
                    socket.emit('authentification', {
                        status: 'ERR',
                        message: 'Nom de compte ou mot de passe incorrect.'
                    })

                    return
                }
            }

            socket.emit('authentification', {
                status: 'OK',
                data: {
                    token: user.token
                }
            })
        })

        socket.on('authorize', async (token) => {
            const user = await User.findOne({ token })

            if (user !== null) {
                socket.token = token
            }

            socket.emit('authorization')
        })
    }
}

module.exports = new UserHandler()
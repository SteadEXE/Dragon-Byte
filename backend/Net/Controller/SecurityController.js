const crypto = require('crypto')
const User = require('../../Models/User')

class SecurityController
{
    async auth (req, res) {
        const username = req.body.username.toLowerCase().trim()
        const password = req.body.password.trim()

        const hash = crypto.createHash('sha256')
            .update(password)
            .digest('hex')

        let user = await User.findOne({
            username: username,
            password: hash
        })

        let payload = { }

        if (user === null) {
            payload.status = 'err'
            payload.message = "Nom d'utilisateur ou mot de passe incorrect."
        } else {
            payload.status = 'ok'
            payload.content = {
                token: user.token
            }
        }

        res.json(payload)
    }
}

module.exports =  new SecurityController()
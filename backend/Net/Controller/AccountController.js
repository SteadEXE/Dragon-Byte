const crypto = require('crypto')
const User = require('../../Models/User')

class AccountController {
    async changeNickname (req, res) {
        const token = req.body.token
        const nickname = req.body.nickname

        let payload = { }

        if (!nickname || nickname.length < 3 || nickname.length > 40) {
            payload.status = 'err'
            payload.message = 'Le surnom doit être comprit entre 3 et 40 caractères.'

            return res.json(payload)
        }

        await User.findOneAndUpdate({ token: token }, {
            nickname: nickname
        })

        payload.status = 'ok'
        payload.message = 'Votre surnom a été modifié.'

        return res.json(payload)
    }

    async changePassword (req, res) {
        const token = req.body.token
        const password = req.body.password

        let payload = { }

        if (!password || password.length < 6 || password.length > 256) {
            payload.status = 'err'
            payload.message = 'Le mot de passe doit être comprit entre 6 et 256 caractères.'

            return res.json(payload)
        }

        let hash = crypto.createHash('sha256')
            .update(password)
            .digest('hex')

        await User.findOneAndUpdate({ token: token }, {
            password: hash
        })

        payload.status = 'ok'
        payload.message = 'Votre mot de passe a été modifié.'

        return res.json(payload)
    }
}

module.exports = new AccountController()
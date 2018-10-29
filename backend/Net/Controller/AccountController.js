const User = require('../../Models/User')

class AccountController {
    async changeNickname (req, res) {
        const token = req.body.token
        const nickname = req.body.nickname

        let payload = { }

        if (nickname.length < 3 || nickname.length > 40) {
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
}

module.exports = new AccountController()
const crypto = require('crypto')
const User = require('../../Models/User')
const { mail } = require('nodemailer')

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
                account: {
                    token: user.token
                }
            }
        }

        setTimeout(() => {
            res.json(payload)
        }, 1000)
    }

    async register (req, res) {
        const username = req.body.username.toLowerCase().trim()
        const password = req.body.password.trim()
        const email = req.body.email.trim()

        let user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })

        let payload = { }

        if (user !== null) {
            payload.status = 'err'
            payload.message = 'Un compte existe déjà avec cette adresse email ou cet utilisateur.'

            res.json(payload)
            return
        }

        if (username.length < 3 || username.length > 30) {
            payload.status = 'err'
            payload.message = 'Le nom d\'utilisateur doit être comprit entre 3 et 30 caractères.'

            res.json(payload)
            return
        }

        if (password.length < 6 || password.length > 256) {
            payload.status = 'err'
            payload.message = 'Le mot de passe doit être comprit entre 6 et 256 caractères.'

            res.json(payload)
            return
        }

        const hash = crypto.createHash('sha256')
            .update(password)
            .digest('hex')

        const token = crypto.randomBytes(16).toString('hex')

        await User.create({
            username: username,
            nickname: username,
            email: email,
            password: hash,
            token: token
        })

        payload.status = 'ok'
        payload.message = 'Votre compte a été crée avec succès.'

        res.json(payload)
    }

    async resetPassword (req, res) {
        const email = req.body.email.trim()

        let user = await User.findOne({
            email: email
        })

        let payload = { }

        if (user == null) {
            payload.status = 'err'
            payload.message = `Aucun compte n'existe avec cette adresse mail.`

            res.json(payload)
            return
        }

        mail()

        payload.status = 'ok'
        payload.message = 'Un nouveau mot de passe a été envoyé par mail.'

        res.json(payload)
    }
}

module.exports =  new SecurityController()
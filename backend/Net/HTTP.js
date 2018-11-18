const http = require('http')
const path = require('path')
const express = require('express')
const SocketIO = require('socket.io')
const bodyParser = require('body-parser')
const validator = require('express-validator')
const Console = require('../Console')
const UserHandler = require('./Handler/UserHandler')
const QueueHandler = require('./Handler/QueueHandler')
const PlayerHandler = require('./Handler/PlayerHandler')
const HistoryHandler = require('./Handler/HistoryHandler')
const RouletteHandler = require('./Handler/Game/RouletteHandler')
const Sockets = require('./Sockets')
const Router = require('./Router/Router')
const User = require('../Models/User')

class HTTP {
    init () {
        const app = express()

        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

        app.use(validator())

        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Headers', 'Content-Type')
            next()
        })

        // Static files.
        app.use('/', express.static(path.resolve(__dirname, '../../frontend/dist')))

        // Router.
        app.use(Router)

        // Fallback to client.
        app.use('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'))
            res.end()
        })

        const server = http.createServer(app)

        Sockets.io = new SocketIO(server)

        Sockets.io.use(async (socket, next) => {
            let token = socket.handshake.query.token
            let user = await User.findOne({ token })

            if (user === null) {
                next(new Error('Invalid auth-token.'))
                return
            }

            socket.token = token
            user.session = Sockets.session

            await user.save()

            Console.network(`Accepted socket ${user.username} (${socket.id})`)
            next()
        })

        Sockets.io.on('connection', (socket) => {
            // Make client join his own room.
            socket.join(socket.token)

            UserHandler.handle(socket)
            QueueHandler.handle(socket)
            PlayerHandler.handle(socket)
            HistoryHandler.handle(socket)
            RouletteHandler.handle(socket)

            socket.on('net/ping', () => {
                socket.emit('net/pong')
            })
        })

        server.listen(8000)
    }
}

module.exports = new HTTP()
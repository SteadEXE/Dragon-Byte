const http = require('http')
const path = require('path')
const express = require('express')
const SocketIO = require('socket.io')
const bodyParser = require('body-parser')
const Console = require('../Console')
const UserHandler = require('./Handler/UserHandler')
const QueueHandler = require('./Handler/QueueHandler')
const PlayerHandler = require('./Handler/PlayerHandler')
const HistoryHandler = require('./Handler/HistoryHandler')
const Sockets = require('./Sockets')
const Router = require('./Router/Router')
const User = require('../Models/User')

class HTTP {
    init () {
        const app = express()

        app.use(bodyParser.urlencoded())
        app.use(bodyParser.json())

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

            Console.network(`Accepted socket ${user.username} (${socket.id})`)
            socket.token = token
            next()
        })

        Sockets.io.on('connection', (socket) => {
            UserHandler.handle(socket)
            QueueHandler.handle(socket)
            PlayerHandler.handle(socket)
            HistoryHandler.handle(socket)

            socket.on('net/ping', () => {
                socket.emit('net/pong')
            })

            socket.on('disconnect', () => {
                Console.network(`Disconnected socket ${socket.id}.`)

                if (!socket.token) {
                    return
                }

                delete Sockets.sockets[socket.token]
            })
        })

        server.listen(8000)
    }
}

module.exports = new HTTP()
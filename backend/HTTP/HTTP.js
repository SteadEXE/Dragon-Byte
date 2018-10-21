const http = require('http')
const express = require('express')
const SocketIO = require('socket.io')
const Console = require('../Console')
const UserHandler = require('./Handler/UserHandler')
const QueueHandler = require('./Handler/QueueHandler')
const PlayerHandler = require('./Handler/PlayerHandler')
const Sockets = require('./Sockets')

class HTTP {
    init () {
        const app = express()

        const server = http.createServer(app)

        Sockets.io = new SocketIO(server)

        Sockets.io.on('connection', (socket) => {
            Console.network(`Accepted socket ${socket.id}.`)

            UserHandler.handle(socket)
            QueueHandler.handle(socket)
            PlayerHandler.handle(socket)

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
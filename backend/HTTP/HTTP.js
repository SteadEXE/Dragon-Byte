const http = require('http')
const express = require('express')
const SocketIO = require('socket.io')
const Console = require('../Console')
const UserHandler = require('./Handler/UserHandler')

class HTTP {
    init () {
        const app = express()

        const server = http.createServer(app)

        const io = new SocketIO(server)

        io.on('connection', (socket) => {
            Console.info('Connection accepted.')
            
            UserHandler.handle(socket)
        })

        server.listen(8000)
    }
}

module.exports = new HTTP()
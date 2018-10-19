const { app } = require('electron')
const mongoose = require('mongoose')
const Console = require('./Console')
const Player = require('./Player/Player')
const HTTP = require('./HTTP/HTTP')

app.on('ready', async () => {
    Console.info('Bootstrap completed.')

    await mongoose.connect('mongodb://127.0.0.1:27017/protoxyde', { useNewUrlParser: true })

    Player.init()
    HTTP.init()
})
const { app } = require('electron')
const mongoose = require('mongoose')
const Console = require('./Console')
const Player = require('./Player/Player')
const HTTP = require('./Net/HTTP')

// Load listeners.
require('./Event/Listener/UserListener')
require('./Event/Listener/PlayerListener')
require('./Event/Listener/HistoryListener')

// Allow autoplay of videos.
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')

app.on('ready', async () => {
    Console.info('Bootstrap completed.')

    await mongoose.connect('mongodb://127.0.0.1:27017/protoxyde', { 
        useNewUrlParser: true,
        useFindAndModify: false
    })

    Player.init()
    HTTP.init()
})
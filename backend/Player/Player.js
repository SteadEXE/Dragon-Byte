const { BrowserWindow } = require('electron')
const EventEmitter = require('events').EventEmitter
const PlayerState = require('./PlayerState')

class Player extends EventEmitter {
    constructor () {
        super()

        this.window = null
        this.state = PlayerState.INITITIALIZING
    }

    init () {
        if (!this.window) {
            this.window = new BrowserWindow({
                width: 800,
                height: 600
            })

            this.window.loadURL(`file:///${__dirname}/Player.html`)
        }
    }
}

module.exports = new Player()
const { BrowserWindow, ipcMain } = require('electron')
const EventEmitter = require('events').EventEmitter
const PlayerState = require('./PlayerState')
const PlayerFirewall = require('./PlayerFirewall')
const Pending = require('../Models/Pending')

class Player extends EventEmitter {
    constructor () {
        super()

        this.window = null
        this.state = PlayerState.INITITIALIZING

        this.duration = 0
        this.elapsed = 0

        this.updated = 0

        this.current = null

        this.emit('update')
    }

    init () {
        if (!this.window) {
            this.window = new BrowserWindow({
                width: 800,
                height: 600
            })

            PlayerFirewall.filter(this.window)

            this.window.webContents.on('dom-ready', () => {
                this.play()
            })

            this.window.loadURL(`file:///${__dirname}/Player.html`)

        }

        ipcMain.on('play', () => {
            this.emit('update')
        })

        ipcMain.on('end', (event, blocked) => {
            this.state = PlayerState.IDLE

            this.emit('update')
            this.play()
        })

        ipcMain.on('load', () => {
            this.state = PlayerState.LOADING
            this.emit('update')
        })
    }

    next () {
        this.window.webContents.send('stop')
    }

    async play () {
        let pending = await Pending.findOne({})
                                .populate('track')
                                .sort({ _id: '-1' })

        if (pending !== null) {
            this.current = pending

            // Generate video from 
            let url = `https://www.youtube.com/watch?v=${pending.track.videoId}`

            this.window.webContents.send('play', url)
        }
    }
}

module.exports = new Player()
const { BrowserWindow, ipcMain } = require('electron')
const EventEmitter = require('events').EventEmitter
const PlayerState = require('./Constants/State')
const PlayerUpdate = require('./Constants/Update')
const PlayerFirewall = require('./PlayerFirewall')
const Pending = require('../Models/Pending')
const Console = require('../Console')

class Player extends EventEmitter {
    constructor () {
        super()

        this.window = null
        this.state = PlayerState.INITITIALIZING

        this.duration = 0
        this.elapsed = 0

        this.updated = 0

        this.current = null
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
            this.emit('update', PlayerUpdate.FULL)
        })

        ipcMain.on('end', (event, blocked) => {
            this.state = PlayerState.IDLE

            this.emit('update', PlayerUpdate.FULL)
            this.play()
        })

        ipcMain.on('load', () => {
            this.state = PlayerState.LOADING
            this.emit('update', PlayerUpdate.STATE)
        })
    }

    async next () {
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

            Console.positive(`Now playing ${pending.track.title}.`, 'PLAYER')
        }
    }
}

module.exports = new Player()
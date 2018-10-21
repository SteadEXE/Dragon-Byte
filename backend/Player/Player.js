const { BrowserWindow, ipcMain } = require('electron')
const EventEmitter = require('events').EventEmitter
const States = require('./Constants/States')
const PlayerUpdate = require('./Constants/Updates')
const PlayerFirewall = require('./PlayerFirewall')
const Pending = require('../Models/Pending')
const History = require('../Models/History')
const Console = require('../Console')

class Player extends EventEmitter {
    constructor () {
        super()

        this.window = null
        this.state = States.INITITIALIZING

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
            this.state = States.PLAYING
            this.emit('update', PlayerUpdate.FULL)

            Console.positive(`Now playing ${this.current.track.title}.`, 'PLAYER')
        })

        ipcMain.on('update', (event, elapsed, duration) => {
            this.elapsed = Math.round(elapsed)
            this.duration = Math.round(duration)

            this.emit('update', PlayerUpdate.UPDATE)
        })

        ipcMain.on('ended', (event, blocked) => {
            this.state = States.IDLE

            this.emit('update', PlayerUpdate.FULL)
            this.play()
        })

        ipcMain.on('load', () => {
            this.state = States.LOADING
            this.emit('update', PlayerUpdate.STATE)

            Console.positive(`Now loading ${this.current.track.title}.`, 'PLAYER')
        })
    }

    async next () {
        this.window.webContents.send('stop')
    }

    async play () {
        let pending = await Pending.findOneAndDelete({})
                                .populate('track')
                                .populate('owner')
                                .sort({ _id: '-1' })

        // Increase played time
        pending.track.played++

        let history = new History({
            owner: pending.owner,
            track: pending.track
        })

        await pending.save()
        await history.save()

        if (pending !== null) {
            this.current = pending

            // Generate video from 
            let url = `https://www.youtube.com/watch?v=${pending.track.videoId}`

            this.window.webContents.send('play', url)
        }
    }
}

module.exports = new Player()
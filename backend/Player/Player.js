const { BrowserWindow, ipcMain } = require('electron')
const EventEmitter = require('events').EventEmitter
const States = require('./Constants/States')
const Updates = require('./Constants/Updates')
const PlayerFirewall = require('./PlayerFirewall')
const PlayerStatus = require('./PlayerStatus')
const Pending = require('../Models/Pending')
const History = require('../Models/History')
const Console = require('../Console')
const PlayerEmitter = require('../Event/Emitter/PlayerEmitter')
const UserEmitter = require('../Event/Emitter/UserEmitter')

class Player extends EventEmitter {
    constructor () {
        super()

        this.window = null
        this.status = new PlayerStatus()
        this.status.state = States.INITITIALIZING
    }

    init () {
        if (!this.window) {
            this.window = new BrowserWindow({
                width: 800,
                height: 600
            })

            PlayerFirewall.filter(this.window)

            this.window.webContents.on('dom-ready', () => {
                this.status.state = States.IDLE
                this.play()
            })

            this.window.loadURL(`file:///${__dirname}/Player.html`)
        }

        ipcMain.on('play', () => {
            this.status.state = States.PLAYING

            PlayerEmitter.emit('update', Updates.FULL, this.status)

            Console.positive(`Now playing ${this.status.current.track.title}.`, '  PLAYER  ')
        })

        ipcMain.on('update', async (event, elapsed, duration) => {
            elapsed = Math.round(elapsed)
            duration = Math.round(duration)

            if (this.status.updated === 0) {
                this.status.updated = Date.now()
            }

            if (elapsed != this.status.elapsed || duration != this.status.duration) {
                this.status.elapsed = Math.round(elapsed)
                this.status.duration = Math.round(duration)

                PlayerEmitter.emit('update', Updates.UPDATE, this.status)
            }

            // Perform experience tick every 5000ms.
            if (Date.now() - this.status.updated >= 5000) {
                this.status.updated = Date.now()
                UserEmitter.emit('experience/tick', this.status.current.owner)
            }
        })

        ipcMain.on('ended', (event, blocked) => {
            this.status = new PlayerStatus()

            PlayerEmitter.emit('update', Updates.STATE, this.status)
            this.play()
        })

        ipcMain.on('load', () => {
            this.status.state = States.LOADING
            PlayerEmitter.emit('update', Updates.FULL, this.status)

            Console.positive(`Now loading ${this.status.current.track.title}.`, '  PLAYER  ')
        })
    }

    async next () {
        this.status.state = States.LOADING
        PlayerEmitter.emit('update', Updates.FULL, this.status)
        this.window.webContents.send('stop')
    }

    async play () {
        if (!this.ready()) {
            return
        }

        let pending = await Pending.findOneAndDelete({})
                                .populate('track')
                                .populate('owner')
                                .sort({ _id: '1' })

        if (pending === null) {
            return
        }

        this.status.state = States.LOADING
        this.status.current = pending

        // Increase played time
        pending.track.played++

        let history = new History({
            owner: pending.owner,
            track: pending.track
        })

        await pending.track.save()
        await history.save()

        // Generate video from 
        let url = `https://www.youtube.com/watch?v=${pending.track.videoId}`

        this.window.webContents.send('play', url)

        this.emit('play')
    }

    ready () {
        return this.status.state === States.IDLE
    }
}

module.exports = new Player()
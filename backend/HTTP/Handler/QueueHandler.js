const request = require('request')
const querystring = require('querystring')
const cheerio = require('cheerio')
const Track = require('../../Models/Track')
const User = require('../../Models/User')
const Pending = require('../../Models/Pending')
const Console = require('../../Console')
const Sockets = require('../Sockets')
const Player = require('../../Player/Player')
const States = require('../../Player/Constants/States')

class QueueHandler {
    handle (socket) {
        this.broadcastQueue(socket)

        socket.on('queue/push', async (link) => {
            // Check that socket is signed-in.
            if (socket.token === null) {
                return
            }

            // Go on link to perform some check and retrieve title of page.
            const req = request(link)

            req.on('response', res => {
                let body = ''

                res.on('data', chunk => body += chunk)

                res.on('end', async () => {
                    const uri = res.request.uri

                    // Not a youtube link
                    if (uri.host !== 'www.youtube.com') {
                        return
                    }

                    // Clean url
                    let queryData = querystring.parse(uri.query)

                    // Verify if track already exists in database
                    let track = await Track.findOne({
                        videoId: queryData.v
                    })

                    if (track === null) {
                        let $ = cheerio.load(body)

                        track = new Track({
                            videoId: queryData.v,
                            title: $('title').text().toString().replace(" - YouTube", "")
                        })

                        await track.save()
                    }

                    const user = await User.findOne({ token: socket.token })

                    let pending = new Pending({
                        owner: user,
                        track: track
                    })

                    await pending.save()

                    if (Player.state === States.IDLE) {
                        Player.play()
                    } else {
                        this.broadcastQueue()
                    }
                })
            })

            req.on('error', () => {
                Console.error(`Unable to request ${payload}`)
            })
        })
    }

    async broadcastQueue (socket = Sockets.io) {
        let pendings = await Pending.find({})
            .populate('track')
            .populate('owner')
        
        pendings = pendings.map(({ track, owner }) => {
            return {
                track: {
                    title: track.title,
                    played: track.played
                },
                owner: {
                    nickname: owner.username,
                    experience: owner.experience
                }
            }
        })

        socket.emit('queue/tracks', pendings)
    }
}

module.exports = new QueueHandler()
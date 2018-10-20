const request = require('request')
const url = require('url')
const querystring = require('querystring')
const Track = require('../../Models/Track')
const User = require('../../Models/User')
const Pending = require('../../Models/Pending')
const Console = require('../../Console')

class QueueHandler {
    handle (socket) {
        socket.on('queue.push', async (link) => {
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
                    let track = Track.findOne({
                        videoId: queryData.v
                    })

                    if (track === null) {
                        let $ = cheerio.load(body)

                        track = Track.create({
                            videoId: queryData.v,
                            title: $('title').text().toString().replace(" - YouTube", "")
                        })

                        await track.save()
                    }

                    const user = await User.findOne({ token: socket.token })

                    const pending = Pending.create({
                        user: user,
                        track: track
                    })

                    await pending.save()
                })
            })

            req.on('error', () => {
                Console.error(`Unable to request ${payload}`)
            })
        })
    }
}

module.exports = new QueueHandler()
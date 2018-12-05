class Track {
    export () {
        return {
            title: this.title,
            played: this.played,
            videoId: this.videoId
        }
    }
}

module.exports = Track
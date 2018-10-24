class History {
    export () {
        return {
            track: this.track.export(),
            owner: this.owner.export()
        }
    }
}

module.exports = History
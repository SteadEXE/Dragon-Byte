class Pending {
    export () {
        return {
            track: this.track.export(),
            owner: this.owner.export()
        }
    }
}

module.exports = Pending
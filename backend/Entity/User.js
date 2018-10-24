class User {
    export () {
        return {
            username: this.username,
            nickname: this.username,
            experience: this.experience,
            points: this.points
        }
    }
}

module.exports = User
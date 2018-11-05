class User {
    export () {
        return {
            username: this.username,
            nickname: this.nickname,
            experience: this.experience,
            points: this.points
        }
    }
}

module.exports = User
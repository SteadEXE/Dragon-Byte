const chalk = require('chalk')

class Console {
    info (text) {
        console.log(`${chalk.bgBlue.white(' INFO ')} ${chalk.white(text)}`)
    }

    error (text) {
        console.log(`${chalk.bgRed.white(' ERROR ')} ${chalk.white(text)}`)
    }
}

module.exports = new Console()
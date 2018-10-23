const chalk = require('chalk')

class Console {
    info (text, title = '  INFO  ') {
        console.log(`${chalk.bgBlue.white(title)} ${chalk.white(text)}`)
    }

    positive (text, title = '  SUCCESS  ') {
        console.log(`${chalk.bgGreen.white(title)} ${chalk.white(text)}`)
    }

    network (text, title = '  NETWORK  ') {
        console.log(`${chalk.bgYellow.white(title)} ${chalk.black(text)}`)
    }

    error (text, title = '  ERROR  ') {
        console.log(`${chalk.bgRed.white(title)} ${chalk.white(text)}`)
    }
}

module.exports = new Console()
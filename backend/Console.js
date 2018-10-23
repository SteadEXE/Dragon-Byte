const chalk = require('chalk')

class Console {
    info (text, title = '  INFO  ') {
        console.log(`${chalk.bgBlue.black(title)} ${chalk.white(text)}`)
    }

    positive (text, title = '  SUCCESS  ') {
        console.log(`${chalk.bgGreen.black(title)} ${chalk.white(text)}`)
    }

    network (text, title = '  NETWORK  ') {
        console.log(`${chalk.bgYellow.black(title)} ${chalk.white(text)}`)
    }

    error (text, title = '  ERROR  ') {
        console.log(`${chalk.bgRed.black(title)} ${chalk.white(text)}`)
    }
}

module.exports = new Console()
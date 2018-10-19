import IO from 'socket.io-client'
import Store from '@/store'

class Socket {
    constructor () {
        this.instance = IO(`ws://${window.location.hostname}:8000`)

        this.instance.on('connect', () => {
            Store.dispatch('socket/connect')

            const token = window.localStorage.getItem('auth-token')

            if (token !== null) {
                this.instance.emit('authorize', token)
            }
        })

        this.instance.on('disconnect', () => {
            Store.dispatch('socket/disconnect')
        })

        this.instance.on('authentification', (payload) => {
            if (payload.status == 'ERR') {
                this.message = payload.message
                this.busy = false

                return
            }

            window.localStorage.setItem('auth-token', payload.data.token)

            this.instance.emit('authorize', payload.data.token)
        })

        this.instance.on('authorization', () => {
            Store.dispatch('account/authentificate')
        })
    }

    getInstance () {
        return this.instance
    }
}

export default new Socket()
import IO from 'socket.io-client'
import SocketStore from '@/store'

class Socket {
    constructor () {
        this.instance = IO('ws://localhost:8000')

        this.instance.on('connect', () => {
            SocketStore.dispatch('socket/connect')
        })

        this.instance.on('disconnect', () => {
            SocketStore.dispatch('socket/disconnect')
        })
    }

    getInstance () {
        return this.instance
    }
}

export default new Socket()
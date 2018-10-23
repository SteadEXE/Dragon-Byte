import Client from 'socket.io-client'
import Store from '@/store'

const Socket = Client(`ws://${window.location.host}`, { 
    autoConnect: false
})

Socket.on('connect', () => {
    Store.dispatch('socket/connect')
})

Socket.on('disconnect', () => {
    Store.dispatch('socket/disconnect')
})

export default Socket
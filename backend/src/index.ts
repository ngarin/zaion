import { createServer } from 'http'

import MessageController from './business/message.controller'
import CreateRoomController from './business/create-room.controller'
import joinRoomController from './business/join-room.controller'
import DisconnectController from './business/disconnect.controller'
import LoginController from './business/login.controller'

const server = createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:4200',
        method: [ 'GET', 'POST' ]
    }
})

let clients: { socket, roomID: string, user: string }[] = []

io.on('connection', socket => {
    socket.on('login', user => {
        LoginController.init(clients, socket, io, { user })
    })

    socket.on('message', (content: string) => {
        MessageController.init(clients, socket, io, { content })
    })

    socket.on('createRoom', () => {
        CreateRoomController.init(clients, socket)
    })

    socket.on('joinRoom', (roomID: string) => {
        joinRoomController.init(clients, socket, io, { roomID })
    })

    socket.on('disconnecting', () => {})

    socket.on('disconnect', () => {
        DisconnectController.init(clients, socket)
    })
})

server.listen(3000)

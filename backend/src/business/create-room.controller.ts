import { v4 as uuidV4 } from 'uuid'

import { Controller } from "../controller"

class CreateRoomController extends Controller {
    public uuidV4 = uuidV4

    public init(clients, socket) {
        const roomID: string = this.uuidV4()

        const client = this.findClient(clients, socket)
        client.roomID = roomID

        socket.join(roomID)
        socket.emit('roomCreated', roomID)
    }
}

export default new CreateRoomController()
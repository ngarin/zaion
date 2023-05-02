import { Controller } from "../controller";

class JoinRoomController extends Controller {
    public init(clients, socket, _, { roomID }) {
        const client = this.findClient(clients, socket)
        client.roomID = roomID

        socket.join(roomID)
        socket.emit('roomJoined')
    }
}

export default new JoinRoomController()
import { Controller } from "../controller";

class MessageController extends Controller {
    public init(clients, socket, io, { content }) {
        const client = this.findClient(clients, socket)

        io.to(client.roomID).emit('receiveMessage', { username: client.user, content })
    }
}

export default new MessageController()
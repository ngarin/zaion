import { Controller } from "../controller";

class DisconnectController extends Controller {
    public init(clients, socket) {
        clients = clients.filter(sock => sock.socket !== socket)

        return clients
    }
}

export default new DisconnectController()
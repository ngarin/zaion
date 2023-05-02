import { Controller } from "../controller"

class LoginController extends Controller {
    public init(clients, socket, _, { user }) {
        clients.push({
            socket,
            roomID: '',
            user
        })
    }
}

export default new LoginController()
export abstract class Controller {
    public abstract init(clients, socket, io, payload?)

    protected findClient(clients, socket) {
        return clients.find(client => client.socket === socket)
    }
}
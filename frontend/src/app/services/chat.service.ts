import { Injectable } from '@angular/core'
import { Socket } from 'ngx-socket-io'
import { map, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _socket: Socket) {}

  public login(username: string) {
    this._socket.emit('login', username)
  }

  public sendMessage(msg: string) {
    this._socket.emit('message', msg)
  }
  public receiveMessage() {
    return this._socket.fromEvent('receiveMessage').pipe(map((data: any) => data))
  }

  public createRoom() {
    this._socket.emit('createRoom')

    return this._socket
      .fromEvent<string>('roomCreated')
      .pipe(
        take(1),
        map((roomID: string) => roomID)
      )
  }

  public joinRoom(roomID: string) {
    this._socket.emit('joinRoom', roomID)

    return this._socket
      .fromEvent<string>('roomJoined')
      .pipe(
        take(1),
        map((username: string) => username)
      )
  }
}

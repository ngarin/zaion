import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Store, select } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { ChatService } from './services/chat.service';
import { IAppState } from './redux/app.reducer';
import { selectChattingState, selectMessages, selectRoomID, selectUsername } from './redux/app.selects';
import { AddMessage, CreateRoom, JoinRoom, Login, SendMessage } from './redux/app.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isChatting$: Observable<boolean> = this._store$.pipe(select(selectChattingState))
  public roomID$: Observable<string> = this._store$.pipe(select(selectRoomID))
  public username$: Observable<string> = this._store$.pipe(select(selectUsername))
  public messages$: Observable<{ username: string, content: string }[]> = this._store$.pipe(select(selectMessages))

  private navigator: Navigator = navigator

  constructor(
    private _socket: Socket,
    private _store$: Store<{ appState: IAppState }>,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this._socket.on('receiveMessage', (message: { username: string, content: string}) => {
      this._store$.dispatch(new AddMessage(message))
    })
  }

  public copyToClipboard(roomID: string) {
    this.navigator.clipboard.writeText(roomID)

    this._snackBar.open('Copied!', '', { duration: 3000 })
  }

  public onChooseUsername(username: string) {
    this._store$.dispatch(new Login({ username }))
  }

  public onJoinRoom(roomID: string) {
    this._store$.dispatch(new JoinRoom({ roomID }))
  }

  public onCreateRoom() {
    this._store$.dispatch(new CreateRoom())
  }

  public onSendMessage(content: string) {
    this._store$.dispatch(new SendMessage({ content }))
  }
}

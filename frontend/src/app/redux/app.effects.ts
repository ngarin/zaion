import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'

import * as AppActions from './app.actions'
import { ChatService } from '../services/chat.service'

@Injectable()
export class AppEffects {
  loginInProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.ActionTypes.Login),
      map(({ payload: { username }}) => {
        this.chatService.login(username)

        return new AppActions.SetUsername({ username })
      })
    )
  )

  createRoomInProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.ActionTypes.CreateRoom),
      switchMap(() =>
        this.chatService.createRoom().pipe(
          map(roomID => new AppActions.SetChattingState({ isChatting: true, roomID }))
        )
      )
    )
  )

  joinRoomInProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.ActionTypes.JoinRoom),
      switchMap(({ payload: { roomID }}) =>
        this.chatService.joinRoom(roomID).pipe(
          map(() => new AppActions.SetChattingState({ isChatting: true, roomID }))
        )
      )
    )
  )

  sendMessageInProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.ActionTypes.SendMessage),
      switchMap(({ payload: { content } }) => {
        this.chatService.sendMessage(content)

        return EMPTY
      })
    ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private chatService: ChatService
  ) {}
}

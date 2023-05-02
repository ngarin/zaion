import { Action } from '@ngrx/store'

export enum ActionTypes {
  SetChattingState = '[App] Set chatting state',
  Login = '[App] login...',
  SetUsername = '[App] Set username',
  CreateRoom = '[App] Creating a room',
  JoinRoom = '[App] Joining a room',
  SendMessage = '[App] Sending a message',
  AddMessage = '[App] Add a message',
}

export interface IAction extends Action {
  payload?: any
}

export class SetChattingState implements IAction {
  readonly type = ActionTypes.SetChattingState

  constructor(public payload: { isChatting: boolean, roomID: string }) {}
}

export class Login implements IAction {
  readonly type = ActionTypes.Login

  constructor(public payload: { username: string }) {}
}

export class SetUsername implements IAction {
  readonly type = ActionTypes.SetUsername

  constructor(public payload: { username: string }) {}
}

export class CreateRoom implements IAction {
  readonly type = ActionTypes.CreateRoom
  public payload: any
}
 
export class JoinRoom implements IAction {
  readonly type = ActionTypes.JoinRoom;
 
  constructor(public payload: { roomID: string }) {}
}
 
export class SendMessage implements IAction {
  readonly type = ActionTypes.SendMessage;
 
  constructor(public payload: { content: string }) {}
}
 
export class AddMessage implements IAction {
  readonly type = ActionTypes.AddMessage;
 
  constructor(public payload: { username: string, content: string }) {}
}
 
export type ActionsUnion = SetChattingState | CreateRoom | JoinRoom | SendMessage | AddMessage;

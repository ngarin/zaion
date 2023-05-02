import * as AppActions from './app.actions'

export interface IAppState {
  isChatting: boolean,
  roomID: string,
  username: string
  messages: { username: string, content: string }[]
}

const initialState: IAppState = {
    isChatting: false,
    roomID: '',
    username: '',
    messages: []
}

export function appReducer(state: IAppState = initialState, action: AppActions.IAction): IAppState {
  switch(action.type) {
    case AppActions.ActionTypes.SetChattingState:
      return {
        ...state,
        isChatting: action.payload.isChatting,
        roomID: action.payload.roomID
      }
    case AppActions.ActionTypes.SetUsername:
      return {
        ...state,
        username: action.payload.username
      }
    case AppActions.ActionTypes.AddMessage:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.payload
        ]
      }
    default:
      return state
  }
}

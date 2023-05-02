import { createSelector } from "@ngrx/store"

import { IAppState } from "./app.reducer"

export const selectApp = (store: { appState: IAppState }) => store.appState

export const selectChattingState = createSelector(selectApp, (state: IAppState) => state.isChatting)
export const selectRoomID = createSelector(selectApp, (state: IAppState) => state.roomID)
export const selectUsername = createSelector(selectApp, (state: IAppState) => state.username)
export const selectMessages = createSelector(selectApp, (state: IAppState) => state.messages)
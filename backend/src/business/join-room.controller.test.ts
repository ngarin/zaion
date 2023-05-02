import { describe, expect, it, jest } from '@jest/globals'

import JoinRoomController from './join-room.controller'

describe('JoinRoomController', () => {
    const socket = {
        join: () => {},
        emit: () => {}
    }

    it('should join a room', () => {
        const roomID = '123'
        const clients = [{
            socket,
            roomID,
            user: 'MyUsername'
        }]

        const socketJoinSpy = jest.spyOn(socket, 'join')
        const socketEmitSpy = jest.spyOn(socket, 'emit')

        JoinRoomController.init(clients, socket, null, { roomID })

        expect(socketJoinSpy).toBeCalledWith(roomID)
        expect(socketEmitSpy).toBeCalledWith('roomJoined')
    });
  });
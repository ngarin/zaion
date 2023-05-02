import { describe, expect, it, jest } from '@jest/globals'
import { v4 as uuidV4 } from 'uuid'

import CreateRoomController from './create-room.controller'

describe('CreateRoomController', () => {
    const socket = {
        join: () => {},
        emit: () => {}
    }

    it('should create a room', () => {
        const roomID = uuidV4()
        const clients = [{
            socket,
            roomID,
            user: 'MyUsername'
        }]

        jest.spyOn(CreateRoomController, 'uuidV4').mockReturnValue(roomID)
        const socketJoinSpy = jest.spyOn(socket, 'join')
        const socketEmitSpy = jest.spyOn(socket, 'emit')

        CreateRoomController.init(clients, socket)

        expect(socketJoinSpy).toBeCalledWith(roomID)
        expect(socketEmitSpy).toBeCalledWith('roomCreated', roomID)
    });
  });
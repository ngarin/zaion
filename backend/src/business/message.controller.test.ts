import { describe, expect, it, jest } from '@jest/globals'

import MessageController from './message.controller'

describe('MessageController', () => {
    const socket = {
        join: () => {},
        emit: () => {}
    }

    const io = {
        to: () => ({
            emit: () => {}
        })
    }

    it('should send a message', () => {
        const user = 'MyUsername'
        const content = 'My message'
        const roomID = '123'
        const clients = [{
            socket,
            roomID,
            user
        }]

        const ioToSpy = jest.spyOn(io, 'to')

        MessageController.init(clients, socket, io, { content })

        expect(ioToSpy).toHaveBeenCalledWith(roomID)
    });
  });
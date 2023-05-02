import { describe, expect, it } from '@jest/globals'

import DisconnectController from './disconnect.controller'

describe('DisconnectController', () => {
    const socket = {
        join: () => {},
        emit: () => {}
    }

    const socket2 = {
        join: () => {},
        emit: () => {}
    }

    it('should disconnect from a room', () => {
        let clients = [
            {
                socket,
                roomID: '123',
                user: 'MyUsername'
            },
            {
                socket2,
                roomID: '456',
                user: 'MyUsername2'
            }
        ]

        const result = DisconnectController.init(clients, socket)

        expect(result.length).toEqual(1)
    });
  });
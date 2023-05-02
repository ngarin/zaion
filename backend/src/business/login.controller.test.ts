import { describe, expect, it } from '@jest/globals'

import LoginController from './login.controller'

describe('LoginController', () => {
    const socket = {
        join: () => {},
        emit: () => {}
    }

    it('should login', () => {
        const user = 'MyUsername'
        const clients = []

        LoginController.init(clients, socket, null, { user })

        expect(clients.length).toEqual(1)
    });
  });
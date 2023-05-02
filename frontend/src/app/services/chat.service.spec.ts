import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';

import { ChatService } from './chat.service';
import { EMPTY, from, tap } from 'rxjs';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Socket,
          useValue: {
            emit: () => {},
            fromEvent: () => EMPTY
          }
        }
      ]
    });
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const username = 'MyUsername'

    spyOn(service['_socket'], 'emit')

    service.login(username)
  
    expect(service['_socket'].emit).toHaveBeenCalledWith('login', username);
  });

  it('should send a message', () => {
    const message = 'My message'

    spyOn(service['_socket'], 'emit')

    service.sendMessage(message)
  
    expect(service['_socket'].emit).toHaveBeenCalledWith('message', message);
  });

  it('should receive a message', () => {
    const message = { username: 'MyUsername', content: 'My message' }

    spyOn(service['_socket'], 'fromEvent').and.returnValue(from([ message ]))

    service
      .receiveMessage()
      .pipe(
        tap(msg => {
          expect(service['_socket'].fromEvent).toHaveBeenCalledWith('receiveMessage')
          expect(msg).toEqual(message)
        })
      )
  });

  it('should create a room', () => {
    const roomID = '123'

    spyOn(service['_socket'], 'emit')
    spyOn(service['_socket'], 'fromEvent').and.returnValue(from([ roomID ]))

    service
      .createRoom()
      .pipe(
        tap(roomID => {
          expect(service['_socket'].emit).toHaveBeenCalledWith('createRoom')
          expect(service['_socket'].fromEvent).toHaveBeenCalledWith('roomCreated')
          expect(roomID).toEqual(roomID)
        })
      )
  });

  it('should receive join a room', () => {
    const roomID = '123'
    const username = 'MyUsername'

    spyOn(service['_socket'], 'emit')
    spyOn(service['_socket'], 'fromEvent').and.returnValue(from([ username ]))

    service
      .joinRoom(roomID)
      .pipe(
        tap(username => {
          expect(service['_socket'].emit).toHaveBeenCalledWith('joinRoom', roomID)
          expect(service['_socket'].fromEvent).toHaveBeenCalledWith('roomJoined')
          expect(username).toEqual(username)
        })
      )
  });
});

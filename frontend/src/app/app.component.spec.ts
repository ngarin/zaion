import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { JoinRoom, Login, SendMessage } from './redux/app.actions';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {
          provide: Socket,
          useValue: {
            on: () => {}
          }
        },
        {
          provide: Store,
          useValue: {
            dispatch: () => {},
            pipe: () => {}
          }
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: () => {}
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should copy to clipboard', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const roomID = '123'

    spyOn<Clipboard, any>(app['navigator'].clipboard, 'writeText')
    spyOn<MatSnackBar, any>(app['_snackBar'], 'open')

    app.copyToClipboard(roomID)

    expect(app['navigator'].clipboard.writeText).toHaveBeenCalledWith(roomID)
    expect(app['_snackBar'].open).toHaveBeenCalled()
  });

  it('should dispatch username', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const username = 'MyUsername'

    spyOn<Store, any>(app['_store$'], 'dispatch')

    app.onChooseUsername(username)

    expect(app['_store$'].dispatch).toHaveBeenCalledWith(new Login({ username }))
  });

  it('should join a room', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const roomID = '123'

    spyOn<Store, any>(app['_store$'], 'dispatch')

    app.onJoinRoom(roomID)

    expect(app['_store$'].dispatch).toHaveBeenCalledWith(new JoinRoom({ roomID }))
  });

  it('should join create a room', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn<Store, any>(app['_store$'], 'dispatch')

    app.onCreateRoom()

    expect(app['_store$'].dispatch).toHaveBeenCalled()
  });

  it('should join send a message', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const content = 'Hello!'

    spyOn<Store, any>(app['_store$'], 'dispatch')

    app.onSendMessage(content)

    expect(app['_store$'].dispatch).toHaveBeenCalledWith(new SendMessage({ content }))
  });
});

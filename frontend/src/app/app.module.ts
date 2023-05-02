import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment'
import { AppComponent } from './app.component';
import { JoinChatComponent } from './components/join-chat/join-chat.component';
import { appReducer } from './redux/app.reducer'
import { AppEffects } from './redux/app.effects';
import { ChatComponent } from './components/chat/chat.component';
import { ChooseUsernameComponent } from './components/choose-username/choose-username.component';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: { transports: ['websocket'], upgrade: false }
}

@NgModule({
  declarations: [
    AppComponent,
    JoinChatComponent,
    ChatComponent,
    ChooseUsernameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    // Redux
    StoreModule.forRoot({
      appState: appReducer
    }),
    EffectsModule.forRoot([ AppEffects ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    // Material
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

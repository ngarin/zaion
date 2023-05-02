import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-chat',
  templateUrl: './join-chat.component.html',
  styleUrls: ['./join-chat.component.scss']
})
export class JoinChatComponent {
  @Output() private joinRoom = new EventEmitter<string>()
  @Output() private createRoom = new EventEmitter<void>()

  public form = new FormGroup({
    roomID: new FormControl<string>('', { validators: [ Validators.required ] })
  })

  public submit() {
    if (this.form.valid) {
      this.joinRoom.emit(this.form.value.roomID as string)
    }
  }

  public create() {
    this.createRoom.emit()
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Input() public messages: { username: string, content: string }[] = []
  @Input() public username: string = ''
  @Output() private sendMessage = new EventEmitter<string>()

  public form = new FormGroup({
    message: new FormControl<string>('')
  })


  public submit() {
    const message: string = this.form.value.message as string

    if (message) {
      this.sendMessage.emit(message)

      this.form.setValue({ message: '' })
    }
  }
}

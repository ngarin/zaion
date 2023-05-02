import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-choose-username',
  templateUrl: './choose-username.component.html',
  styleUrls: ['./choose-username.component.scss']
})
export class ChooseUsernameComponent {
  @Output() private chooseUsername = new EventEmitter<string>()

  public form = new FormGroup({
    username: new FormControl<string>('', { validators: [ Validators.required ] })
  })

  public submit() {
    if (this.form.valid) {
      this.chooseUsername.emit(this.form.value.username as string)
    }
  }
}

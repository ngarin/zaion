import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit message if form empty', () => {
    component.submit()

    spyOn(component['sendMessage'], 'emit')

    expect(component['sendMessage'].emit).not.toHaveBeenCalled()
  });

  it('should submit message', () => {
    const message = 'My message'

    component.form.setValue({ message })
    component.form.updateValueAndValidity()
  
    spyOn(component['sendMessage'], 'emit')

    component.submit()

    expect(component['sendMessage'].emit).toHaveBeenCalledWith(message)
  });
});

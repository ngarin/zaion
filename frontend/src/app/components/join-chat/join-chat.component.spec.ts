import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { JoinChatComponent } from './join-chat.component';

describe('JoinChatComponent', () => {
  let component: JoinChatComponent;
  let fixture: ComponentFixture<JoinChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinChatComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit roomID if form empty', () => {
    component.submit()

    spyOn(component['joinRoom'], 'emit')

    expect(component['joinRoom'].emit).not.toHaveBeenCalled()
  });

  it('should submit roomID', () => {
    const roomID = '123'

    component.form.setValue({ roomID })
    component.form.updateValueAndValidity()
  
    spyOn(component['joinRoom'], 'emit')

    component.submit()

    expect(component['joinRoom'].emit).toHaveBeenCalledWith(roomID)
  });

  it('should create a room', () => {
    spyOn(component['createRoom'], 'emit')
  
    component.create()

    expect(component['createRoom'].emit).toHaveBeenCalled()
  });
});

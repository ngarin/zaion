import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ChooseUsernameComponent } from './choose-username.component';

describe('ChooseUsernameComponent', () => {
  let component: ChooseUsernameComponent;
  let fixture: ComponentFixture<ChooseUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseUsernameComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit username if form empty', () => {
    component.submit()

    spyOn(component['chooseUsername'], 'emit')

    expect(component['chooseUsername'].emit).not.toHaveBeenCalled()
  });

  it('should submit username', () => {
    const username = 'MyUsername'

    component.form.setValue({ username })
    component.form.updateValueAndValidity()
  
    spyOn(component['chooseUsername'], 'emit')

    component.submit()

    expect(component['chooseUsername'].emit).toHaveBeenCalledWith(username)
  });
});

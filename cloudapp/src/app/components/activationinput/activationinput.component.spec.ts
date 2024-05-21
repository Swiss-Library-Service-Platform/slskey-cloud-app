import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationinputComponent } from './activationinput.component';

describe('ActivationinputComponent', () => {
  let component: ActivationinputComponent;
  let fixture: ComponentFixture<ActivationinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationinputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

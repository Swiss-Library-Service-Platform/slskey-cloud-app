import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationpreviewComponent } from './activationpreview.component';

describe('ActivationpreviewComponent', () => {
  let component: ActivationpreviewComponent;
  let fixture: ComponentFixture<ActivationpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationpreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

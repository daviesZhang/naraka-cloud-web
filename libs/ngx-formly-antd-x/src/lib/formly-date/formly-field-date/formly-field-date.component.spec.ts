import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFieldDateComponent } from './formly-field-date.component';

describe('FormlyFieldDateComponent', () => {
  let component: FormlyFieldDateComponent;
  let fixture: ComponentFixture<FormlyFieldDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFieldDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFieldDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

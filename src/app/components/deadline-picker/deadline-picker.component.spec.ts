import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlinePickerComponent } from './deadline-picker.component';

describe('DeadlinePickerComponent', () => {
  let component: DeadlinePickerComponent;
  let fixture: ComponentFixture<DeadlinePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadlinePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadlinePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlinePickerComponent } from './deadline-picker.component';
import {TranslationService} from "../../translation/translation.service";
import {TranslatePipe} from "../../translation/translate.pipe";
import { By } from "@angular/platform-browser";
import { MatDatepicker, MatDatepickerInput, MatDatepickerInputEvent } from "@angular/material/datepicker";

describe('DeadlinePickerComponent', () => {
  let component: DeadlinePickerComponent;
  let fixture: ComponentFixture<DeadlinePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadlinePickerComponent, TranslatePipe ],
      providers: [ TranslationService ]
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

  it('has date input', () => {
    const {debugElement} = fixture;
    const dateInput: MatDatepicker<any> = debugElement.query(By.css('[data-testid="deadline-picker"]')).nativeElement;
    expect(dateInput).toBeTruthy();
    expect(dateInput.datepickerInput).toBeTruthy();
  });

  it('allows direct input', () => {
    const {debugElement} = fixture;
    const dateInput: MatDatepicker<any> = debugElement.query(By.css('[data-testid="deadline-picker"]')).nativeElement;
    dateInput.datepickerInput.getStartValue();
    // TODO implement test
  });

  it('can be opened', () => {
    const {debugElement} = fixture;
    const dateInput: MatDatepicker<any> = debugElement.query(By.css('[data-testid="deadline-picker"]')).nativeElement;
    expect(dateInput.open).toBeTruthy();
  })

  it('pre-selects current date', () => {
    const {debugElement} = fixture;
    const dateInput: MatDatepicker<any> = debugElement.query(By.css('[data-testid="deadline-picker"]')).nativeElement;
    expect(dateInput.datepickerInput.getStartValue()).toEqual(new Date().toLocaleDateString());
  });

  it('displays date according to locale', () => {
    // TODO implement test
  });
});

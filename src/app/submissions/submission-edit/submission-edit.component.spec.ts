import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionEditComponent } from './submission-edit.component';

describe('SubmissionEditComponent', () => {
  let component: SubmissionEditComponent;
  let fixture: ComponentFixture<SubmissionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

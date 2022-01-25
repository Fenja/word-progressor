import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionFooterComponent } from './submission-footer.component';

describe('SubmissionFooterComponent', () => {
  let component: SubmissionFooterComponent;
  let fixture: ComponentFixture<SubmissionFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingGoalsComponent } from './writing-goals.component';

describe('WritingGoalsComponent', () => {
  let component: WritingGoalsComponent;
  let fixture: ComponentFixture<WritingGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritingGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

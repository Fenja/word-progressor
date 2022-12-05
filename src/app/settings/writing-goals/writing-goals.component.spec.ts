import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingGoalsComponent } from './writing-goals.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('WritingGoalsComponent', () => {
  let component: WritingGoalsComponent;
  let fixture: ComponentFixture<WritingGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritingGoalsComponent ],
      providers: [ HttpClientTestingModule ],
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

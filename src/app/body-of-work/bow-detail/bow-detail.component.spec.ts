import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowDetailComponent } from './bow-detail.component';

describe('BowDetailComponent', () => {
  let component: BowDetailComponent;
  let fixture: ComponentFixture<BowDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BowDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

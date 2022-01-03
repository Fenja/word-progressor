import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyOfWorkComponent } from './body-of-work.component';

describe('BodyOfWorkComponent', () => {
  let component: BodyOfWorkComponent;
  let fixture: ComponentFixture<BodyOfWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyOfWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyOfWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

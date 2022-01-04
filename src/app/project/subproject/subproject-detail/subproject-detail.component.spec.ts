import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprojectDetailComponent } from './subproject-detail.component';

describe('SubprojectDetailComponent', () => {
  let component: SubprojectDetailComponent;
  let fixture: ComponentFixture<SubprojectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubprojectDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprojectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

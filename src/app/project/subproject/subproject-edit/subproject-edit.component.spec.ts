import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprojectEditComponent } from './subproject-edit.component';

describe('SubprojectEditComponent', () => {
  let component: SubprojectEditComponent;
  let fixture: ComponentFixture<SubprojectEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubprojectEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprojectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

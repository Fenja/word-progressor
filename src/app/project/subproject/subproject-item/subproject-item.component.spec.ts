import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprojectItemComponent } from './subproject-item.component';

describe('SubprojectItemComponent', () => {
  let component: SubprojectItemComponent;
  let fixture: ComponentFixture<SubprojectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubprojectItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprojectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

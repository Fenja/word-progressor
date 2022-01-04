import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprojectOverviewComponent } from './subproject-overview.component';

describe('SubprojectOverviewComponent', () => {
  let component: SubprojectOverviewComponent;
  let fixture: ComponentFixture<SubprojectOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubprojectOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprojectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

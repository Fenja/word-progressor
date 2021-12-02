import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogDialogComponent } from './edit-log-dialog.component';

describe('EditLogDialogComponent', () => {
  let component: EditLogDialogComponent;
  let fixture: ComponentFixture<EditLogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLogDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

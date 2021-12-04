import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlogEditDialog } from './wordlog-edit-dialog.component';

describe('EditLogDialogComponent', () => {
  let component: WordlogEditDialog;
  let fixture: ComponentFixture<WordlogEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordlogEditDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordlogEditDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

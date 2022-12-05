import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEditDialogComponent } from './note-edit-dialog.component';
import {MatDialogRef} from "@angular/material/dialog";

describe('NoteEditDialogComponent', () => {
  let component: NoteEditDialogComponent;
  let fixture: ComponentFixture<NoteEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteEditDialogComponent ],
      providers: [ { provide: MatDialogRef, useValue: {} } ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

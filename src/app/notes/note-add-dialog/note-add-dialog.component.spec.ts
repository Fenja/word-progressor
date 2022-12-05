import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteAddDialogComponent } from './note-add-dialog.component';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AddNoteDialogComponent', () => {
  let component: NoteAddDialogComponent;
  let fixture: ComponentFixture<NoteAddDialogComponent>;

  let text1: 'This is a note';
  let text2: 'Thiß is á \'special\" _note42';
  let text3: '<b>Use</b> <a src="#">HTML</a> and :sunglasses:';
  let textEvil: 'Template <script>alert("0wned")</script>';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteAddDialogComponent, HttpClientTestingModule ],
      providers: [ { provide: MatDialogRef, useValue: {} } ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('adds note', () => {

  });

  it('does not add empty note', () => {

  });*/

  it('closes when adding note', () => {
    const closeSpy = spyOn(component, 'close');
    component.addNote(text1);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('can not add several notes at once', () => {
    component.addNote(text1);
    expect(component.addNote(text2)).toBeFalsy();
  });

  it('filters script tags', () => {
    component.addNote(textEvil);
  });
});

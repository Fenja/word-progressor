import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteDialogComponent } from './add-note-dialog.component';

describe('AddNoteDialogComponent', () => {
  let component: AddNoteDialogComponent;
  let fixture: ComponentFixture<AddNoteDialogComponent>;

  let text1: 'This is a note';
  let text2: 'Thiß is á \'special\" _note42';
  let text3: '<b>Use</b> <a src="#">HTML</a> and :sunglasses:';
  let textEvil: 'Template <script>alert("0wned")</script>';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNoteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteDialogComponent);
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

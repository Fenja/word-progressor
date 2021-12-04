import { Component, Input } from '@angular/core';
import { Note, Project } from "../../project/project.model";
import { MatDialog } from "@angular/material/dialog";
import { TranslationService } from "../../translation/translation.service";
import { NoteEditDialogComponent } from "../note-edit-dialog/note-edit-dialog.component";
import { NoteService } from "../note.service";

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent {

  @Input() project!: Project;
  @Input() note!: Note;

  constructor(
    private dialog: MatDialog,
    private translationService: TranslationService,
    private noteService: NoteService,
  ) { }

  editNote() {
    this.dialog.open(NoteEditDialogComponent,{data: {content: this.note.content}})
      .afterClosed().subscribe(newContent => {
      if (!newContent) return;
      if (this.project) {
       this.noteService.editNote(this.project, this.note, newContent);
      }
    });
  }

  deleteNote() {
    if (confirm(this.translationService.translate('msg_delete_note'))) {
     this.noteService.deleteNote(this.project, this.note);
    }
  }


}

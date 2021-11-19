import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Project } from "../project.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProjectService } from "../project.service";
import { SnackbarService } from "../../services/snackbar.service";
import { TranslationService } from "../../translation/translation.service";
import * as uuid from "uuid";

export interface AddNoteDialogData {
  id: string;
  project: Project;
}

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html'
})
export class AddNoteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    private projectService: ProjectService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: AddNoteDialogData
  ) { }

  addNote(text: string) {
    this.close();
    if (text.length <= 0) return;
    if (!this.data.project.notes) this.data.project.notes = [];
    this.data.project.notes.push({
      id: uuid.v4(),
      index: this.data.project.notes.length,
      content: text,
    });
    this.projectService.editProject(this.data.id, this.data.project);
    this.snackBarService.showSnackBar(this.translationService.translate('msg_note_added'));
  }

  close() {
    this.dialogRef.close();
  }
}

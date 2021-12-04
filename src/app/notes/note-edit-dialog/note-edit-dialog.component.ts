import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface NoteEditDialogData {
  content: string;
}

@Component({
  selector: 'app-note-edit-dialog',
  templateUrl: './note-edit-dialog.component.html'
})
export class NoteEditDialogComponent {

  content: string = '';

  constructor(
    public dialogRef: MatDialogRef<NoteEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteEditDialogData
  ) {
    this.content = data.content;
  }

  save(text: string) {
    this.dialogRef.close(text);
  }

  close() {
    this.dialogRef.close();
  }

}

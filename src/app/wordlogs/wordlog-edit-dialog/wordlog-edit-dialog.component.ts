import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WordLog } from "../../project/project.model";

export interface WordlogEditDialogData {
    log: WordLog
}

@Component({
  selector: 'app-edit-log-dialog',
  templateUrl: './wordlog-edit-dialog.component.html'
})
export class WordlogEditDialog {

  log!: WordLog;

  constructor(
    public dialogRef: MatDialogRef<WordlogEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: WordlogEditDialogData
  ) {
    this.log = data.log;
  }

  save(words: number) {
    this.dialogRef.close(words);
  }

  close() {
    this.dialogRef.close();
  }

}

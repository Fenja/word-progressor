import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WordLog } from "../../project/project.model";

export interface EditLogDialogData {
    log: WordLog
}

@Component({
  selector: 'app-edit-log-dialog',
  templateUrl: './edit-log-dialog.component.html'
})
export class EditLogDialogComponent {

  log!: WordLog;

  constructor(
    public dialogRef: MatDialogRef<EditLogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditLogDialogData
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

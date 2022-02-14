import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { SubmissionService } from "../submission.service";
import { Submission } from "../submission.model";

export interface SubmissionDialogData {
  submission: Submission;
}

@Component({
  selector: 'submission-select-dialog',
  templateUrl: './submission-select-dialog.component.html'
})
export class SubmissionSelectDialogComponent {

  public submissions: Submission[] | undefined;
  selectedSubmission: Submission | undefined;

  constructor(
    public dialogRef: MatDialogRef<SubmissionSelectDialogComponent>,
    private submissionService: SubmissionService,
    @Inject(MAT_DIALOG_DATA) public data: SubmissionDialogData,
  ) {
    this.submissions = this.submissionService.submissions;
    this.selectedSubmission = data.submission;
  }

  close(): void {
    this.dialogRef.close();
  }

  select() {
    this.dialogRef.close(this.selectedSubmission);
  }

  selectSubmission(submission: Submission) {
    this.selectedSubmission = submission;
  }
}

import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {Submission} from "../submission.model";
import {SubmissionService} from "../submission.service";
import {SnackbarService} from "../../services/snackbar.service";
import {TranslationService} from "../../translation/translation.service";

@Component({
  selector: 'app-submission-report-dialog',
  templateUrl: './submission-report-dialog.component.html'
})
export class SubmissionReportDialogComponent {

  errorKey: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<SubmissionReportDialogComponent>,
    private submissionService: SubmissionService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
  ) {}

  send(linkInput: HTMLInputElement) {
    let reportUrl;
    try {
      reportUrl = new URL(linkInput.value);
      this.errorKey = undefined;
    } catch (err) {
      this.errorKey = 'error_invalid_url';
    }

    if (reportUrl) {
      this.submissionService.reportSubmission(reportUrl.toString());
      this.close();
      this.snackBarService.showSnackBar(this.translationService.translate('msg_submission_report_send'))
    }
  }

  close() {
    this.dialogRef.close();
  }

}

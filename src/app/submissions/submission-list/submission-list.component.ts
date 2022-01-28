import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Submission } from "../submission.model";
import { Subscription } from "rxjs";
import { SubmissionService } from "../submission.service";
import { Settings } from "../../auth/user.model";
import Utils from "../../helpers/utils";

@Component({
  selector: 'app-submission-list',
  templateUrl: './submission-list.component.html',
  styleUrls: ['./submission-list.component.scss']
})
export class SubmissionListComponent {

  private favorites: string[] | undefined = [];

  submissions: Submission[] = [];
  private allSubmissions: Submission[];
  private subscriptions: Subscription[] = [];
  private settings: Settings = Utils.getDefaultSettings();


  get totalSubmissionsLength() {
    return this.allSubmissions.length;
  }
  get displaySubmissionsLength() {
    return this.submissions.length;
  }

  constructor(
    private userService: UserService,
    private submissionService: SubmissionService
  ) {
    this.allSubmissions = this.submissionService.submissions;
    this._filterSubmissions();

    this.subscriptions.push( this.userService.$filterChange.subscribe(() => this._filterSubmissions()));

    this.subscriptions.push( this.submissionService.getSubmissions().subscribe(submissions => {
        this.allSubmissions = submissions;
        this._filterSubmissions();
      }
    ));

    this.subscriptions.push( this.userService.getUser().subscribe(user => {
      if (user && user.settings){
        this.settings = user.settings;
        this.favorites = user.favorites;
        if (this.settings.isAdmin) {
          this._updateSubmissions();
        }
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private _filterSubmissions() {
    this.submissions = this.allSubmissions.filter((submission: Submission) => {
      if (this.settings.filterFavorites) return !!this.favorites?.find(s => s === submission.id!);
      return true;
    });

    if (this.settings.isSortSubmissionByDeadline) {
      const today = Utils.normalizedToday();
      this.submissions.sort((a: Submission, b: Submission) => {
        if (!a.deadline || Utils.normalizeDate(a.deadline) < today) return 1;
        else if (!b.deadline || Utils.normalizeDate(b.deadline) < today) return -1;
        else return new Date(a.deadline).valueOf() - new Date(b.deadline).valueOf();
      });
    }
  }

  private _updateSubmissions() {
    this.submissions.forEach(submission => {
      if (!submission.creationDate) {
        submission.creationDate = new Date();
        this.submissionService.editSubmission(submission.id!, submission);
      }
      if (submission.deadline) {
        let aMonthAfterDeadline = submission.deadline;
        aMonthAfterDeadline.setDate(aMonthAfterDeadline.getDate() + 30);
        if (aMonthAfterDeadline.getTime()  > new Date().getTime()) {
          this.submissionService.deleteSubmission(submission.id!, submission);
        }
      }
    })
  }
}

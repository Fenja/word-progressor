import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import {Submission} from "../submission.model";
import {Subscription} from "rxjs";
import {SubmissionService} from "../submission.service";

@Component({
  selector: 'app-submission-list',
  templateUrl: './submission-list.component.html',
  styleUrls: ['./submission-list.component.scss']
})
export class SubmissionListComponent implements OnInit {

  favorites: string[] = [];

  submissions: Submission[] = [];
  private allSubmissions: Submission[];
  private subscriptions: Subscription[] = [];

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
    this.subscriptions.push( this.submissionService.getSubmissions().subscribe(submissions => {
        this.allSubmissions = submissions;
        this.submissions = this.allSubmissions;
      }
    ));
  }

  ngOnInit() {
    this.userService.getUser().subscribe(u => {
      if (u && u.settings) {
        this.favorites = u.settings.favorites;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

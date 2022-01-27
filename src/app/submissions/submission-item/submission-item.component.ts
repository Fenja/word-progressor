import {Component, Input, OnInit} from '@angular/core';
import { Submission } from "../submission.model";
import { CountEntity, Project, ProjectState, ProjectType } from "../../project/project.model";
import Utils from "../../helpers/utils";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { SubmissionService } from "../submission.service";
import { ProjectService } from "../../project/project.service";
import * as uuid from "uuid";
import {Router} from "@angular/router";

@Component({
  selector: 'app-submission-item',
  templateUrl: './submission-item.component.html',
  styleUrls: ['./submission-item.component.scss']
})
export class SubmissionItemComponent implements OnInit {

  @Input() submission!: Submission;

  eCountEntity = CountEntity;
  isPassed: boolean = false;
  isAdmin: boolean | undefined;
  isFavorite: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private submissionService: SubmissionService,
    private projectService: ProjectService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push( this.userService.getUser().subscribe(user => {
      if (user && user.settings) this.isAdmin = user.settings.isAdmin;
      if (user && user.favorites) this.isFavorite = !!user.favorites.find(f => f === this.submission.id!);
    }));
    if (this.submission.deadline) {
      this.isPassed = Utils.normalizeDate(this.submission.deadline) < Utils.normalizedToday();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  createProjectFromSubmission() {
    this.router.navigate(['/projects/new/' + this.submission.id]).then();
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.userService.toggleFavoriteSubmission(this.submission.id!, this.isFavorite);
  }

  openSubmission() {
    window.open(this.submission.link, "_blank");
  }
}

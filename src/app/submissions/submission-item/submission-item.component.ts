import { Component, Input, OnInit } from '@angular/core';
import { Submission } from "../submission.model";
import {CountEntity, Project} from "../../project/project.model";
import Utils from "../../helpers/utils";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { SubmissionService } from "../submission.service";
import { ProjectService } from "../../project/project.service";
import { Router } from "@angular/router";

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
  isNew: boolean = false; // new means creation no longer than a week ago
  private subscriptions: Subscription[] = [];
  linkedProjects: Project[] = [];

  constructor(
    private userService: UserService,
    private submissionService: SubmissionService,
    private projectService: ProjectService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push( this.userService.getUser().subscribe(user => {
      if (!!user && !!user.settings) this.isAdmin = user.settings.isAdmin;
      if (!!user && !!user.favorites && user.favorites.length > 0) this.isFavorite = !!user.favorites!.find(f => f === this.submission.id!);
    }));

    this.linkedProjects = this.projectService.getProjects().slice().filter(project => project.submission?.id === this.submission.id);
    this.subscriptions.push( this.projectService.projectList.subscribe(projectList => {
      this.linkedProjects = projectList.filter(project => project.submission?.id === this.submission.id);
    }));

    if (this.submission.deadline) {
      this.isPassed = Utils.normalizeDate(this.submission.deadline) < Utils.normalizedToday();
      let creation = new Date(this.submission.creationDate);
      creation.setDate(creation.getDate() + 7);
      this.isNew = creation.getTime()  > new Date().getTime();
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

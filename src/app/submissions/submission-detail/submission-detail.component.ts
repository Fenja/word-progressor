import {Component, OnDestroy, OnInit} from "@angular/core";
import {Submission} from "../submission.model";
import {CountEntity, Project} from "../../project/project.model";
import {Subscription} from "rxjs";
import {SubmissionService} from "../submission.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TranslationService} from "../../translation/translation.service";
import {ProjectService} from "../../project/project.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-submission-detail',
  templateUrl: './submission-detail.component.html'
})
export class SubmissionDetailComponent implements OnInit, OnDestroy {

  submission!: Submission
  id!: string;

  isPassed: boolean = false;
  isAdmin: boolean | undefined;
  isFavorite: boolean = false;
  linkedProjects: Project[] = [];
  private subscriptions: Subscription[] = [];

  eCountEntity = CountEntity;

  constructor(
    private submissionService: SubmissionService,
    private route: ActivatedRoute,
    private router: Router,
    private translationService: TranslationService,
    private projectService: ProjectService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        const sub = this.submissionService.getSubmission(this.id);
        if (!!sub) {
          this.submission = sub;
        } else {
          console.log('submission with id ' + this.id + ' not found');
          this.router.navigate(['/submissions']).then();
        }
      }
    );

    this.linkedProjects = this.projectService.getProjects().slice().filter(project => project.submission?.id === this.submission.id);
    this.subscriptions.push( this.projectService.projectList.subscribe(projectList => {
      this.linkedProjects = projectList.filter(project => project.submission?.id === this.submission.id);
    }));
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

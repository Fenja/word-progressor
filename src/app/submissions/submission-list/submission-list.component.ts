import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Submission } from "../submission.model";
import { Subscription } from "rxjs";
import { SubmissionService } from "../submission.service";
import { Language, Settings, SubmissionProjects } from "../../auth/user.model";
import Utils from "../../helpers/utils";
import { MatDialog } from "@angular/material/dialog";
import { SubmissionReportDialogComponent } from "../submission-report-dialog/submission-report-dialog.component";
import { AuthService } from "../../auth/auth.service";
import { ProjectService } from "../../project/project.service";
import { Project, ProjectState } from "../../project/project.model";

class Participation {
  projectId!: string;
  projectTitle!: string;
  submissionTitle!: string;
  submissionId!: string;
  deadline: Date | undefined;
  isPassed: boolean | undefined;
  //milestone: Milestone;
}

export enum ParticipationState {
  planned = 'planned',
  submitted = 'submitted',
  rejected = 'rejected',
  accepted = 'accepted',
  published = 'published',
}

@Component({
  selector: 'app-submission-list',
  templateUrl: './submission-list.component.html',
  styleUrls: ['./submission-list.component.scss']
})
export class SubmissionListComponent {

  isLoading = true;
  private favorites: String[] | undefined = [];
  submissionProjects: SubmissionProjects[] | undefined = [];
  participationsInState: Map<ParticipationState, Participation[]> = new Map<ParticipationState, Participation[]>();

  submissions: Submission[] = [];
  reports: string[] = [];
  private allSubmissions: Submission[];
  private subscriptions: Subscription[] = [];
  private settings: Settings = Utils.getDefaultSettings();
  isAdmin: boolean | undefined;

  eParticipationState = ParticipationState;


  get totalSubmissionsLength() {
    return this.allSubmissions.length;
  }
  get displaySubmissionsLength() {
    return this.submissions.length;
  }

  constructor(
    private userService: UserService,
    private submissionService: SubmissionService,
    private dialog: MatDialog,
    public authService: AuthService,
    private projectService: ProjectService,
  ) {
    this.allSubmissions = this.submissionService.getSubmissions();
    this._filterSubmissions();

    if( !!this.userService.getSettings() ) {
      this.settings = this.userService.getSettings()!;

      this.isAdmin = this.settings.isAdmin;
      if (this.isAdmin) {
        console.log('isAdmin');
        this.reports = this.submissionService.getReports();
        this.subscriptions.push( this.submissionService.reportList.subscribe(reports => {
          this.reports = reports;
        }));
      }
    }
    this.subscriptions.push( this.userService.$filterChange
      .subscribe(() => this._filterSubmissions()));

    this.subscriptions.push( this.submissionService.submissionList.subscribe(submissions => {
      this.allSubmissions = submissions;
        this._filterSubmissions();
        this.isLoading = false;
      }
    ));

    this.subscriptions.push( this.userService.getUser()
      .subscribe(user => {
      if (user && user.settings){
        this.settings = user.settings;
        this.favorites = user.favorites;
        this.submissionProjects = user.submittedProjects;
        if (this.settings.isAdmin) {
          this._updateSubmissions();
        }
        if (!this.settings.language) this.settings.language = 'all';
      }

     /* if (!!this.favorites && this.favorites.length > 0) {
        let deleteFavIndizes: any[] = [];
        this.favorites!.forEach(fav => {
          if (!this.allSubmissions.find(sub => sub.id === fav)) {
            const index = this.favorites!.indexOf(fav);
            if (!!index) deleteFavIndizes.push(index);
          }
        });
        deleteFavIndizes.forEach(index => delete this.favorites![index!]);
      }*/
    }));

    this.subscriptions.push( this.projectService.projectList.subscribe(projectList => {
      this.participationsInState = new Map<ParticipationState, Participation[]>();
      const today = Utils.normalizedToday();
      var participatingProjects = projectList.filter(project => !!project.submission);
      participatingProjects.forEach(pp => {
        var participation = {
          projectId: pp.id!,
          projectTitle: pp.workingTitle,
          submissionId: pp.submission!.id!,
          submissionTitle: pp.submission!.title,
          deadline: pp.submission!.deadline,
          isPassed: !!pp.submission!.deadline ? Utils.normalizeDate(pp.submission!.deadline) < today : false
        };
        var pState = SubmissionListComponent.getParticipationState(pp);
        if (!this.participationsInState.has(pState)) {
          this.participationsInState.set(pState, [participation]);
        } else {
          this.participationsInState.get(pState)!.push(participation);
        }
      });

      /*this.participations.sort((a: Participation, b: Participation) => {
        if (!a.deadline || Utils.normalizeDate(a.deadline) < today) return 1;
        else if (!b.deadline || Utils.normalizeDate(b.deadline) < today) return -1;
        else return new Date(a.deadline).valueOf() - new Date(b.deadline).valueOf();
      });*/
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private _filterSubmissions() {
    const today = Utils.normalizedToday();

    this.submissions = this.allSubmissions.filter((submission: Submission) => {
      if (this.settings.isHidePassed && submission.deadline && Utils.normalizeDate(submission.deadline) < today) return false;

      let displayLanguage = true;
      const language: Language = submission.language === 'deutsch' ? 'de' : submission.language === 'english' ? 'en' : 'all';
      if (this.settings.language !== 'all') {
         displayLanguage = this.settings.language === language;
      }

      let displayFavorite = true;
      if (this.settings.filterFavorites && !!this.favorites){
        displayFavorite = (!!this.favorites && this.favorites.length > 0) ? Array.from(this.favorites.values()).includes(submission.id!) : false;
      }

      return displayLanguage && displayFavorite;
    });

    this.submissions.sort((a: Submission, b: Submission) => {
      if (!a.deadline || Utils.normalizeDate(a.deadline) < today) return 1;
      else if (!b.deadline || Utils.normalizeDate(b.deadline) < today) return -1;
      else return new Date(a.deadline).valueOf() - new Date(b.deadline).valueOf();
    });
  }

  private _updateSubmissions() {
    this.submissions.forEach(submission => {
      if (!submission.creationDate) {
        submission.creationDate = new Date();
        this.submissionService.editSubmission(submission.id!, submission);
      }
      if (submission.deadline) {
        let aMonthAfterDeadline = new Date(submission.deadline);
        aMonthAfterDeadline.setDate(aMonthAfterDeadline.getDate() + 100);
        if (aMonthAfterDeadline.getTime()  < new Date().getTime()) {
          console.log('should delete ',submission.title)
          //this.submissionService.deleteSubmission(submission.id!, submission);
        }
      }
    })
  }

  reportSubmission() {
    this.dialog.open(SubmissionReportDialogComponent);
  }

  openReportLink(report: string) {
    let url = new URL(report);
    if (url) window.open(url, "_blank");
  }

  deleteReport(report: string) {
    this.submissionService.deleteReport(report)
  }

  private static getParticipationState(project: Project): ParticipationState {
    if (project.state === ProjectState.submitted) {
      return ParticipationState.submitted;
    } else if (project.state === ProjectState.published) {
      return ParticipationState.published;
    } else if (project.state === ProjectState.accepted) {
      return ParticipationState.accepted
    } else if (project.state != ProjectState.finished) {
      return ParticipationState.planned;
    } else {
      return ParticipationState.rejected;
    }
  }
}

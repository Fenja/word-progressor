import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CountEntity, Project, ProjectState, ProjectType, WordLog} from "../project/project.model";
import {ProjectService} from "../project/project.service";
import {UserService} from "../services/user.service";
import {Subscription} from "rxjs";
import Utils from "../helpers/utils";
import {filter} from "rxjs/operators";
import {Submission} from "../submissions/submission.model";
import {SubmissionService} from "../submissions/submission.service";
import {Settings, userData} from "../auth/user.model";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  isLoading = true;

  wordsToday = 0;
  wordGoalDaily: number | undefined;
  metGoal = false;
  userWordLogs: WordLog[] | undefined;
  isNewUser = true;
  wips: Project[] = [];
  private subscriptions: Subscription[] = [];
  settings: Settings = Utils.getDefaultSettings();

  showInstallPWA = false;
  deferredPrompt: any;
  lastWeeksLogs: WordLog[] = [];
  lastMonthLogs: WordLog[] = [];

  projectsInState: Map<ProjectState,number> = new Map<ProjectState, number>();
  projectsInSuperState: Map<ProjectState, number> = new Map<ProjectState, number>();
  projectsInType: Map<ProjectType,number> = new Map<ProjectType, number>();
  totalProjects: number = 0;
  totalWords: number = 0;

  nextSubmissions: Submission[] = [];
  currentlySubmitted: Project[] = [];

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: any) {
    console.log(e);
    e.preventDefault();
    this.deferredPrompt = e;
    this.showInstallPWA = true;
  }

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private userService: UserService,
    private submissionService: SubmissionService,
  ) { }

  ngOnInit() {
    // user id needs to be set first
    this.authService.initAuthToken().subscribe(() => {

      this.wips = this.projectService.getProjects().filter(p => p.isWorkInProgress);
      this.subscriptions.push(
        this.projectService.projectList
        .pipe(
          filter((projects: Project[]) => !!projects && projects.length > 0)
        )
        .subscribe(projects => {
        this.wips = projects.filter(p => p.isWorkInProgress);
        projects.forEach(project => {
          project.subprojects?.filter(s => {
            if (s.isWorkInProgress && !this.wips.find(p => p.id == project.id)) this.wips.push(project);
          })
        })
        this._initProjectStats(projects);
        }
      ));

      this.subscriptions.push(this.userService.getUser().subscribe(u => {
        if (u.settings) {
          this.settings = u.settings;
        }

        this.userWordLogs = u.wordLogs;
        if (this.userWordLogs){
          this.userWordLogs = Utils.repairWordLogs(this.userWordLogs);
          this._initWeekLog();
          this._initMonthLog();
        }
        const logToday = u.wordLogs?.find(log => log.date === Utils.normalizedToday().toString());
        this.wordsToday = logToday?.words ?? 0;
        this.wordGoalDaily = u.settings?.dailyWordGoal;
        if (this.wordGoalDaily) {
          this.metGoal = this.wordsToday >= this.wordGoalDaily;
        }

        this._initSubmissionStats(u);
      }));
      this.isNewUser = this.userService.isNewUser();
      this.isLoading = false;

    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  installPWA() {
    this.showInstallPWA = false;
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice
        .then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('user accepted the A2HS prompt');
          }
          this.deferredPrompt = null;
        })
  }

  private _initWeekLog() {
    let lastWeek: string[] = [];
    this.lastWeeksLogs = [];
    let day = Utils.normalizedToday();
    for (let i = 0; i < 7; i += 1) {
      lastWeek.push(day.toString());
      day -= 86400000;
    }
    lastWeek.forEach((day: string) => {
      const wordLog = this.userWordLogs!.find(log => log.date === day);
      this.lastWeeksLogs!.push(wordLog ?? {date: day, words: 0})
    });
    this.lastWeeksLogs.reverse();
  }

  private _initMonthLog() {
    let lastMonth: string[] = [];
    this.lastMonthLogs = [];
    let day = Utils.normalizedToday();
    for (let i = 0; i < 30; i += 1) {
      lastMonth.push(day.toString());
      day -= 86400000;
    }
    lastMonth.forEach((day: string) => {
      const wordLog = this.userWordLogs!.find(log => log.date === day);
      this.lastMonthLogs!.push(wordLog ?? {date: day, words: 0})
    });
    this.lastMonthLogs.reverse();
  }

  private _initProjectStats(projects: Project[]) {
    this.projectsInState = new Map<ProjectState, number>();
    this.projectsInSuperState = new Map<ProjectState, number>();
    this.projectsInType = new Map<ProjectType, number>();
    projects.forEach(project => {
      let existingCount: number = this.projectsInState.get(project.state) ?? 0;
      this.projectsInState.set(project.state, existingCount + 1);

      existingCount = this.projectsInType.get(project.type) ?? 0;
      this.projectsInType.set(project.type, existingCount + 1);

      this.totalProjects += 1;
      if (project.countEntity === CountEntity.words && project.currentCount) this.totalWords += project.currentCount;
    });

    this.projectsInSuperState.set(
      ProjectState.finished,
      (this.projectsInState.get(ProjectState.finished) ?? 0) +
      (this.projectsInState.get(ProjectState.submitted) ?? 0) +
      (this.projectsInState.get(ProjectState.published) ?? 0)
    );
    this.projectsInSuperState.set(
      ProjectState.idea,
      (this.projectsInState.get(ProjectState.idea) ?? 0) +
      (this.projectsInState.get(ProjectState.plan) ?? 0) +
      (this.projectsInState.get(ProjectState.plot) ?? 0) +
      (this.projectsInState.get(ProjectState.bunny) ?? 0)
    );
    this.projectsInSuperState.set(
      ProjectState.draft_1,
      (this.projectsInState.get(ProjectState.draft_1) ?? 0)
    );
    this.projectsInSuperState.set(
      ProjectState.revise,
      (this.projectsInState.get(ProjectState.draft_2) ?? 0) +
      (this.projectsInState.get(ProjectState.draft_3) ?? 0) +
      (this.projectsInState.get(ProjectState.revise) ?? 0) +
      (this.projectsInState.get(ProjectState.edit) ?? 0)
    );
    this.projectsInSuperState.set(
      ProjectState.wait,
      (this.projectsInState.get(ProjectState.wait) ?? 0) +
      (this.projectsInState.get(ProjectState.alpha) ?? 0) +
      (this.projectsInState.get(ProjectState.beta) ?? 0) +
      (this.projectsInState.get(ProjectState.edit) ?? 0)
    );
    this.projectsInSuperState.set(
      ProjectState.abandon,
      (this.projectsInState.get(ProjectState.abandon) ?? 0)
    );
  }

  private _initSubmissionStats(user: userData) {
    if (user.favorites) {
      let favoriteSubmissions: Submission[] = [];
      user.favorites.forEach(fav => {
        let submission = this.submissionService.getSubmission(fav);
        if (submission && !Utils.isInPast(submission.deadline)) favoriteSubmissions.push(submission);
      });
      favoriteSubmissions = favoriteSubmissions.sort((a: Submission, b: Submission) => {
        let deadlineA = !!a.deadline ? new Date(a.deadline).getTime() : 0;
        let deadlineB = !!b.deadline ? new Date(b.deadline).getTime() : 0;
        return deadlineA - deadlineB;
      });
      this.nextSubmissions = favoriteSubmissions.slice(0,3);
    }
  }
}

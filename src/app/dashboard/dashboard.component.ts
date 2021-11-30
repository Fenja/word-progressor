import { Component, HostListener, OnDestroy } from '@angular/core';
import { Project, WordLog } from "../project/project.model";
import { ProjectService } from "../project/project.service";
import { UserService } from "../services/user.service";
import { Subscription } from "rxjs";
import Utils from "../helpers/utils";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnDestroy {

  wordsToday = 0;
  wordGoalDaily: number | undefined;
  metGoal = false;
  userWordLogs: WordLog[] | undefined;
  isNewUser = true;
  wips: Project[] = [];
  private subscriptions: Subscription[] = [];

  showInstallPWA = false;
  deferredPrompt: any;
  lastWeeksLogs: WordLog[] = [];
  lastMonthLogs: WordLog[] = [];

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: any) {
    console.log(e);
    e.preventDefault();
    this.deferredPrompt = e;
    this.showInstallPWA = true;
  }

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
  ) {
    this.wips = this.projectService.getProjects().filter(p => p.isWorkInProgress);
    this.subscriptions.push( this.projectService.projectList.subscribe(projects => {
      this.wips = projects.filter(p => p.isWorkInProgress);
      }
    ));

    this.subscriptions.push(this.userService.getUser().subscribe(u => {
      this.userWordLogs = u.wordLogs;
      if (this.userWordLogs) this._initWeekLog();
      const logToday = u.wordLogs?.find(log => log.date === Utils.normalizedToday().toString());
      this.wordsToday = logToday?.words ?? 0;
      this.wordGoalDaily = u.settings?.dailyWordGoal;
      if (this.wordGoalDaily) {
        this.metGoal = this.wordsToday >= this.wordGoalDaily;
      }
    }));
    this.isNewUser = this.userService.isNewUser();
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
}

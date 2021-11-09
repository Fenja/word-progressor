import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from "../project/project.model";
import { ProjectService } from "../project/project.service";
import { UserService } from "../services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  wordsToday = 0;
  isNewUser = true;
  wips: Project[] = [];
  wordStatistics: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
  ) {
    this.wips = this.projectService.getProjects().filter(p => p.isWorkInProgress);
    this.subscriptions.push( this.projectService.projectList.subscribe(projects => {
      this.wips = projects.filter(p => p.isWorkInProgress);
      }
    ));
  }

  ngOnInit() {
    this._initWordsToday();
    this._initNewUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private _initWordsToday() {
    this.wordsToday = this.userService.getWordsToday();
  }

  private _initNewUser() {
    this.isNewUser = this.userService.isNewUser();
  }

}

import { Component, OnDestroy } from '@angular/core';
import { Project } from "../project/project.model";
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

    this.subscriptions.push(this.userService.getUser().subscribe(u => {
      console.log('user at dashboard', u);
      if (!u.wordLogs && !!u.wordLogsString) u.wordLogs = JSON.parse(u.wordLogsString);
      this.wordsToday = u.wordLogs?.find(log => log.date === Utils.normalizedToday().toString())?.words ?? 0;
    }));
    this.isNewUser = this.userService.isNewUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}

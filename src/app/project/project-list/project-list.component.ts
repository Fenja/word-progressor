import { Component, OnDestroy } from '@angular/core';
import { Project } from "../project.model";
import { ProjectService } from "../project.service";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnDestroy {

  projects: Project[] = [];
  private allProjects: Project[];
  private subscriptions: Subscription[] = [];

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
  ) {
    this.allProjects = this.projectService.getProjects();
    this.projects = this.allProjects;

    this.subscriptions.push( this.userService.$filterChange.subscribe(() => this._filterProjects()));

    this.subscriptions.push( this.projectService.projectList.subscribe(projects => {
        this.allProjects = projects;
        this._filterProjects();
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private _filterProjects() {
    this.projects = this.allProjects.filter(project => {
        if (this.userService.showOnlyWip) return project.isWorkInProgress;
        return true;
      }
    );
  }

}

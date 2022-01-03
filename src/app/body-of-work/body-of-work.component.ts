import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project, ProjectState} from "../project/project.model";
import {Subscription} from "rxjs";
import {ProjectService} from "../project/project.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-body-of-work',
  templateUrl: './body-of-work.component.html'
})
export class BodyOfWorkComponent implements OnDestroy {

  bow: Project[] = [];
  private allProjects: Project[];
  private subscriptions: Subscription[] = [];

  constructor(
    private projectService: ProjectService
  ) {
    this.allProjects = this.projectService.getProjects();
    this._getBow();

    this.subscriptions.push( this.projectService.projectList.subscribe(projects => {
        this.allProjects = projects;
        this._getBow();
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private _getBow() {
    this.bow = this.allProjects.filter(project =>
      (project.state === ProjectState.finished ||
          project.state === ProjectState.submitted ||
          project.state === ProjectState.published)
    )
  }
}

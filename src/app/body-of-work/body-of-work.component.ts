import { Component, OnDestroy } from '@angular/core';
import { Project, ProjectState } from "../project/project.model";
import { Subscription } from "rxjs";
import { ProjectService } from "../project/project.service";

@Component({
  selector: 'app-body-of-work',
  templateUrl: './body-of-work.component.html'
})
export class BodyOfWorkComponent implements OnDestroy {

  isLoading = true;

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
        this.isLoading = false;
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
    this.bow.sort((a: Project, b: Project) => {
      if (a.state === b.state) return 0;
      else if (a.state === ProjectState.published) return 1;
      else if (b.state === ProjectState.finished) return -1;
      else return 0;
    })
  }
}

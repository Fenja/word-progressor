import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from "../project.model";
import { ProjectService } from "../project.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit, OnDestroy {

  projects: Project[];
  // @ts-ignore
  private subscriptions: Subscription[] = [];

  constructor(private projectService: ProjectService) {
    this.projects = this.projectService.getProjects();
  }

  ngOnInit(): void {
    this.subscriptions.push( this.projectService.projectList.subscribe(
      (projects: Project[]) => {
        this.projects = projects.slice(0,9);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}

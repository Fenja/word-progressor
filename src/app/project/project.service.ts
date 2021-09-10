import {Project, ProjectState, ProjectType} from "./project.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public projectList = new Subject<Project[]>();

  private projects: Project[] = [
    new Project(
      'My great Novel', 'stuff happens', '',
      ProjectType.novel, ProjectState.draft_1, new Date(2020, 10, 11),
      10000, 80000
    ),
    new Project(
      'Fortytwo', 'A sharp short story', '',
      ProjectType.novel, ProjectState.draft_1, new Date(2022, 2, 2),
      0, 10000
    )
  ];

  constructor() {}

  getProjects(): Project[] {
    return this.projects.slice();
  }

  getProject(id: number): Project {
    return this.projects[id];
  }

  addProject(project: Project) {
    this.projects.push(project);
    this.projectList.next(this.projects.slice());
  }

  editProject(id: number, project: Project): void {
    this.projects[id] = project;
    this.projectList.next(this.projects.slice());
  }

  deleteProject(id: number): void {
    this.projects.splice(id, 1);
    this.projectList.next(this.projects.slice());
  }

  hasProject(id: number): boolean {
    return !!this.projects[id];
  }
}

import { Project } from "./project.model";
import { Injectable } from "@angular/core";
import { DataStorageService } from "../data-storage.service";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public projectList: Observable<Project[]>;

  constructor(
    private dataStorageService: DataStorageService
  ) {
    this.projectList = dataStorageService.projectList;
    this.fetchProjects();
  }

  getProjects(): Project[] {
    this.fetchProjects();
    return this.dataStorageService.getProjects();
  }

  getProject(id: string): Project | undefined {
    let result = this.dataStorageService.projects.find(p => p.id === id);
    console.log(result);
    return result;
  }

  addProject(project: Project) {
    this.dataStorageService.addProject(project);
  }

  editProject(id: string, project: Project): void {
    project.lastUpdate = new Date();
    this.dataStorageService.editProject(id, project);
  }

  deleteProject(id: string): void {
    this.dataStorageService.deleteProject(id);
  }

  hasProject(id: string): boolean {
    return !!(this.dataStorageService.projects.find(p => p.id === id));
  }

  fetchProjects() {
    this.dataStorageService.fetchProjects();
  }
}

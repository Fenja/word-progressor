import { Project } from "./project.model";
import { Injectable } from "@angular/core";
import { DataStorageService } from "../services/data-storage.service";
import { Observable } from "rxjs";
import { SnackbarService } from "../services/snackbar.service";
import { TranslationService } from "../translation/translation.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public projectList: Observable<Project[]>;

  constructor(
    private dataStorageService: DataStorageService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
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
    this.snackBarService.showSnackBar(project.workingTitle + this.translationService.translate('msg_created'));
  }

  editProject(id: string, project: Project): void {
    project.lastUpdate = new Date();
    this.dataStorageService.editProject(id, project);
    this.snackBarService.showSnackBar(project.workingTitle + this.translationService.translate('msg_saved'));
  }

  deleteProject(id: string, workingTitle: string): void {
    this.dataStorageService.deleteProject(id);
    this.snackBarService.showSnackBar(workingTitle + this.translationService.translate('msg_deleted'));
  }

  hasProject(id: string): boolean {
    return !!(this.dataStorageService.projects.find(p => p.id === id));
  }

  fetchProjects() {
    this.dataStorageService.fetchProjects();
  }
}

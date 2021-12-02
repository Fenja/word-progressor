import {Project, WordLog} from "./project.model";
import { Injectable } from "@angular/core";
import { DataStorageService } from "../services/data-storage.service";
import { SnackbarService } from "../services/snackbar.service";
import { TranslationService } from "../translation/translation.service";
import { Observable } from "rxjs";

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
  }

  getProjects(): Project[] {
    return this.dataStorageService.getProjects();
  }

  getProject(id: string): Project | undefined {
    return this.dataStorageService.projects.find(p => p.id === id);
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

  fixWordLogs(project: Project) {
    if (!project.wordLogs) return;
    let newLogs: WordLog[] = [];
    project.wordLogs.forEach(log => newLogs.push(log));
    project.wordLogs = newLogs;
  }
}

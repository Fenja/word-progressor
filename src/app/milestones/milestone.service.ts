import {Injectable} from "@angular/core";
import {DataStorageService} from "../services/data-storage.service";
import {SnackbarService} from "../services/snackbar.service";
import {TranslationService} from "../translation/translation.service";
import {Project} from "../project/project.model";
import {Milestone, MilestoneType} from "./milestone.model";
import * as uuid from "uuid";

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  constructor(
    private dataStorageService: DataStorageService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
  ) {}

  getMilestoneList(project: Project): Milestone[] {
    return project.milestones ?? [];
  }

  addMilestone(project: Project, milestone: Milestone): Project {
    if (!project.milestones) project.milestones = [];
    project.milestones?.push(milestone);
    this.snackBarService.showSnackBar('added milestone');
    return project;
  }

  addMilestoneByType(project: Project, milestoneType: MilestoneType): Project {
    return this.addMilestone(project, {
      id: uuid.v4(),
      milestoneType,
      projectId: project.id!,
      date: Date.now(),
    });
  }
}

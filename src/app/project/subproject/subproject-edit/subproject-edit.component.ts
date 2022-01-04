import {Component, Input, ViewChild} from '@angular/core';
import {CountEntity, Project, ProjectState} from "../../project.model";
import {Subproject} from "../subproject.model";
import {NgForm} from "@angular/forms";
import {ProjectService} from "../../project.service";

@Component({
  selector: 'app-subproject-edit',
  templateUrl: './subproject-edit.component.html'
})
export class SubprojectEditComponent {

  @Input() project!: Project;
  @Input() editMode: boolean = false;

  @Input() id?: string;

  @Input() subproject: Subproject = {
    workingTitle: '',
    description: '',
    state: ProjectState.idea,
    countEntity: CountEntity.words,
    currentCount: 0,
    goalCount: 0,
    isWorkInProgress: false,
  }

  eProjectState = ProjectState;
  eCountEntity = CountEntity;

  @ViewChild('projectForm', {static: false}) projectForm!: NgForm;

  constructor(
    private projectService: ProjectService
  ) {
    if (this.editMode && !!this.id) {
      let loadSubproject = this.project.subprojects?.find(p => p.id === this.id);
      if (loadSubproject) this.subproject = loadSubproject;
    }
  }

  onSubmit(): void {
  if (!this.projectForm.valid) return;

    if (this.editMode) {
      this.project.subprojects
    } else {
      this.project.subprojects?.push(this.subproject);
    }
    this.projectService.editProject(this.project.id!, this.project);
  }

  onDelete() {
    if (!this.project.subprojects) return;
    // TODO translate delete msg
    if (confirm("Are you sure to delete "+this.subproject.workingTitle)) {
      const index = this.project.subprojects.indexOf(this.subproject);
      delete this.project.subprojects[index];
      this.projectService.editProject(this.project.id!, this.project);
    }
  }
}

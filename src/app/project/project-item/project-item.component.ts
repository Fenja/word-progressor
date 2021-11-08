import { Component, Input } from '@angular/core';
import { CountEntity, Project } from "../project.model";
import { MatDialog } from "@angular/material/dialog";
import { AddWordsDialogComponent } from "../add-words-dialog/add-words-dialog.component";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html'
})
export class ProjectItemComponent {

  @Input() project!: Project;

  eCountEntity = CountEntity;

  constructor(
    private dialog: MatDialog
  ) { }

  addToProject() {
    if (this.project) {
      this.dialog.open(AddWordsDialogComponent, {
        data: {
          id: this.project.id,
          project: this.project
        }
      });
    }
  }
}

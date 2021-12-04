import { Component, Input } from '@angular/core';
import { CountEntity, Project } from "../project.model";
import { MatDialog } from "@angular/material/dialog";
import { WordlogAddDialogComponent } from "../../wordlogs/wordlag-add-dialog/wordlog-add-dialog.component";
import { NoteAddDialogComponent } from "../../notes/note-add-dialog/note-add-dialog.component";

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
      this.dialog.open(WordlogAddDialogComponent, {
        data: {
          id: this.project.id,
          project: this.project
        }
      });
    }
  }

  addNote() {
    if (this.project) {
      this.dialog.open(NoteAddDialogComponent, {
        data: {
          id: this.project.id,
          project: this.project
        }
      });
    }
  }
}

import {Component, Input, OnInit} from '@angular/core';
import { CountEntity, Project } from "../project.model";
import { MatDialog } from "@angular/material/dialog";
import { WordlogAddDialogComponent } from "../../wordlogs/wordlag-add-dialog/wordlog-add-dialog.component";
import { NoteAddDialogComponent } from "../../notes/note-add-dialog/note-add-dialog.component";
import Utils from "../../helpers/utils";
import {ProjectService} from "../project.service";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html'
})
export class ProjectItemComponent implements OnInit {

  @Input() project!: Project;

  eCountEntity = CountEntity;
  isPassed: boolean = false;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    if (this.project.deadline) {
      this.isPassed = Utils.normalizeDate(this.project.deadline) < Utils.normalizedToday();
    }
  }

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

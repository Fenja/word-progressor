import { Component, Input, OnInit } from '@angular/core';
import { Project } from "../project.model";
import { MatDialog } from "@angular/material/dialog";
import { AddWordsDialogComponent } from "../add-words-dialog/add-words-dialog.component";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html'
})
export class ProjectItemComponent implements OnInit {

  // @ts-ignore
  @Input() project: Project;

  constructor(
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {}

  addWords() {
    this.dialog.open(AddWordsDialogComponent,{
      data: {
        id: this.project.id,
        project: this.project
      }
    });
  }
}

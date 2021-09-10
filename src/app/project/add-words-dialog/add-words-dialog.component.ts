import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Project} from "../project.model";
import {ProjectService} from "../project.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface AddWordsDialogData {
  id: number;
  project: Project;
}

@Component({
  selector: 'app-add-words-dialog',
  templateUrl: './add-words-dialog.component.html'
})
export class AddWordsDialogComponent implements OnInit {

  @ViewChild('newWordsInput', {static: true}) newWordsInput!: ElementRef;
  validProject: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AddWordsDialogComponent>,
    private projectService: ProjectService,
  @Inject(MAT_DIALOG_DATA) public data: AddWordsDialogData
) {
    if(!projectService.hasProject(this.data.id)) {
      this.validProject = false;
    }
  }

  ngOnInit(): void {
  }

  addWords(words: number) {
    this.data.project.currentWordcount += words;
    close();
    // TODO show Snackbar
    // TODO feed statistics service
  }

  updateWords() {
    this.projectService.editProject(this.data.id, this.data.project);
    close();
    // TODO show Snackbar
    // TODO feed statistics service
  }

  close(): void {
    this.dialogRef.close();
  }
}

import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Project } from "../project.model";
import { ProjectService } from "../project.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {TranslationService} from "../../translation/translation.service";

export interface AddWordsDialogData {
  id: string;
  project: Project;
}

@Component({
  selector: 'app-add-words-dialog',
  templateUrl: './add-words-dialog.component.html'
})
export class AddWordsDialogComponent implements OnInit {

  @ViewChild('newWordsInput', {static: true}) newWordsInput!: ElementRef;
  validProject: boolean = true;
  date: Date | undefined = undefined;
  wordsBeforeUpdate!: number;

  constructor(
    public dialogRef: MatDialogRef<AddWordsDialogComponent>,
    private projectService: ProjectService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
  @Inject(MAT_DIALOG_DATA) public data: AddWordsDialogData
) {
    if(!projectService.hasProject(this.data.id)) {
      this.validProject = false;
    }
  }

  ngOnInit(): void {
    this.wordsBeforeUpdate = this.data.project.currentWordcount;
  }

  addWords(words: number) {
    this.data.project.currentWordcount += words;
    this.projectService.editProject(this.data.id, this.data.project);
    this.updateWords(words);
  }

  updateCurrentWords() {
    this.projectService.editProject(this.data.id, this.data.project);
    this.updateWords(this.data.project.currentWordcount - this.wordsBeforeUpdate);
  }

  updateWords(words: number) {
    this.close();
    if (!!this.date) {
      // TODO this.logWords(this.date, words);
    }
    this.snackBarService.showSnackBar(words + this.translationService.translate('msg_words_added'))
  }

  close(): void {
    this.dialogRef.close();
  }
}

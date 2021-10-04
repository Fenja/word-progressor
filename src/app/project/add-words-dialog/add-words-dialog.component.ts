import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Project } from "../project.model";
import { ProjectService } from "../project.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SnackbarService } from "../../services/snackbar.service";
import { TranslationService } from "../../translation/translation.service";
import { LogWordsService } from "../../services/log-words.service";

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/de';
import 'moment/locale/en-gb';

export interface AddWordsDialogData {
  id: string;
  project: Project;
}

@Component({
  selector: 'app-add-words-dialog',
  templateUrl: './add-words-dialog.component.html',
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de_DE',
    }, {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    }, {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS
    }
  ],
})
export class AddWordsDialogComponent implements OnInit {

  @ViewChild('newWordsInput', {static: true}) newWordsInput!: ElementRef;
  @ViewChild('totalWordsInput', {static: true}) totalWordsInput!: ElementRef;
  validProject: boolean = true;
  date: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<AddWordsDialogComponent>,
    private projectService: ProjectService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
    private logWordsService: LogWordsService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: AddWordsDialogData
  ) {
    this.date.setHours(0,0,0,0);
    if(!projectService.hasProject(this.data.id)) {
      this.validProject = false;
    }
  }

  ngOnInit(): void {
    this._adapter.setLocale(this.translationService.getLocale());
  }

  addWords(words: number) {
    this.updateWords(words);
  }

  updateCurrentWords(totalWords: number) {
    this.updateWords(totalWords - this.data.project.currentWordcount );
  }

  updateWords(words: number) {
    this.close();
    if (words === 0) return;
    this.data.project.currentWordcount += words;
    if (!!this.date) {
      this.logWordsService.logWords(this.data.id, this.data.project, {words: words, date: this.date});
    }
    this.projectService.editProject(this.data.id, this.data.project);
    this.snackBarService.showSnackBar(words + this.translationService.translate('msg_words_added'))
  }

  close(): void {
    this.dialogRef.close();
  }
}

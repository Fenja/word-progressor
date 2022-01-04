import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CountEntity, Project } from "../../project/project.model";
import { ProjectService } from "../../project/project.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SnackbarService } from "../../services/snackbar.service";
import { TranslationService } from "../../translation/translation.service";
import { LogWordsService } from "../../services/log-words.service";

import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import Utils from "../../helpers/utils";

export interface WordlogAddDialogData {
  id: string;
  project: Project;
}

@Component({
  selector: 'app-add-words-dialog',
  templateUrl: './wordlog-add-dialog.component.html',
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
export class WordlogAddDialogComponent implements OnInit {

  @ViewChild('asWordsInputNew', {static: false}) asWordsInputNew: ElementRef | undefined;
  @ViewChild('asWordsInputTotal', {static: false}) asWordsInputTotal: ElementRef | undefined;

  validProject: boolean = true;
  date: Date = new Date();
  entity!: CountEntity;
  eCountEntity = CountEntity;

  constructor(
    public dialogRef: MatDialogRef<WordlogAddDialogComponent>,
    private projectService: ProjectService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
    private logWordsService: LogWordsService,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: WordlogAddDialogData
  ) {
    this.date.setHours(0,0,0,0);
    if(!projectService.hasProject(this.data.id)) {
      this.validProject = false;
    }
    this.entity = data.project.countEntity;
  }

  ngOnInit(): void {
    this._adapter.setLocale(this.translationService.getLocale());
  }

  addWords(words?: number, characters?: number, pages?: number) {
    this.updateWords(words, characters, pages);
  }

  updateCurrentWords(totalWords?: number, totalCharacters?: number, totalPages?: number) {
    const words = totalWords ? totalWords! - this.data.project.currentCount : 0;
    const characters = totalCharacters ? totalCharacters! - this.data.project.currentCount : 0;
    const pages = totalPages ? totalPages! - this.data.project.currentCount : 0;
    this.updateWords(words, characters, pages);
  }

  updateWords(words?: number, characters?: number, pages?: number) {
    this.close();
    if ((!words || words === 0) && (!characters || characters === 0) && (!pages || pages === 0)) return;
    if (!!this.date) {
      this.logWordsService.logWords(this.data.id, this.data.project, Utils.normalizeDate(this.date).toString(), words, characters, pages);
    }

    let addedMsg: string;
    switch (this.entity) {
      case CountEntity.words: addedMsg = 'msg_words_added'; break;
      case CountEntity.characters: addedMsg = 'msg_characters_added'; break;
      case CountEntity.pages: addedMsg = 'msg_pages_added'; break;
    }
    this.snackBarService.showSnackBar(words + this.translationService.translate(addedMsg))
  }

  close(): void {
    this.dialogRef.close();
  }
}

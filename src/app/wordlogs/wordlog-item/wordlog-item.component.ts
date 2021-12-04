import { Component, Input } from '@angular/core';
import {CountEntity, Project, WordLog} from "../../project/project.model";
import { LogWordsService } from "../../services/log-words.service";
import {WordlogEditDialog} from "../wordlog-edit-dialog/wordlog-edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TranslationService} from "../../translation/translation.service";

@Component({
  selector: 'app-wordlog-item',
  templateUrl: './wordlog-item.component.html',
  styleUrls: ['./wordlog-item.component.scss']
})
export class WordlogItemComponent {

  @Input() log!: WordLog;
  @Input() project?: Project;
  @Input() entity!: CountEntity;


  constructor(
    private dialog: MatDialog,
    private logWordsService: LogWordsService,
    private translationService: TranslationService,
  ) { }

  editLog() {
    if (this.log) {
      const wordsBefore = this.log.words;
      this.dialog.open(WordlogEditDialog,{data: {log: this.log}})
        .afterClosed().subscribe(newWords => {
          if (!newWords) return;
          if (this.project) {
            const words = newWords - wordsBefore;
            this.logWordsService.logWords(this.project.id!, this.project, this.log.date, words);
          }
      });
    }
  }

  deleteLog() {
    if (confirm(this.translationService.translate('msg_delete_log'))) {
      if (this.project) {
        this.logWordsService.deleteLog(this.project.id!, this.project, this.log);
      }
    }
  }

}

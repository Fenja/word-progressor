import { Component, Input, OnInit } from '@angular/core';
import { CountEntity, Project, WordLog } from "../../project/project.model";

@Component({
  selector: 'app-wordlog-list',
  templateUrl: './wordlog-list.component.html'
})
export class WordlogListComponent implements OnInit {

  @Input() wordLogs!: WordLog[];
  @Input() project?: Project;
  @Input() numEntries?: number;
  @Input() countEntity: CountEntity = CountEntity.words;
  displayWordLogs: WordLog[] = [];
  showMore: boolean = false;

  ngOnInit() {
    if (this.wordLogs) this.displayWordLogs = this.wordLogs;
    if (this.numEntries) {
      this.displayWordLogs = this.wordLogs.slice(this.wordLogs.length - this.numEntries);
    }
    if (this.displayWordLogs.length <= 5) this.showMore = true;
  }



}

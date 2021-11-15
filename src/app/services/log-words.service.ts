import { Injectable } from '@angular/core';
import { CountEntity, Project, WordLog } from "../project/project.model";
import { ProjectService } from "../project/project.service";
import { DataStorageService } from "./data-storage.service";
import Utils from "../helpers/utils";

@Injectable({
  providedIn: 'root'
})
export class LogWordsService {

  constructor(
    private projectService: ProjectService,
    private dataStorageService: DataStorageService,
  ) { }

  logWords(id: string, project: Project, date: Date, words: number) {
    project.wordLogs = this.addWordsToLog(project.wordLogs, date, words);
    this.projectService.editProject(id, project);

    // do not log characters or pages to user stats
    if (project.countEntity === CountEntity.words) {
      let user = this.dataStorageService.user;
      user.wordLogs = this.addWordsToLog(user.wordLogs, date, words);
      this.dataStorageService.editUser(user.id!, user);
    }
  }

  public addWordsToLog(wordLogs: WordLog[] | undefined, date: Date, words: number): WordLog[] {
    if (!wordLogs || wordLogs.length <= 0) wordLogs = [];
    let logDate = Utils.normalizeDate(date).toString();
    let existingEntry = wordLogs.find(log => log.date === logDate);
    if (existingEntry) {
      words += existingEntry.words;
      const index = wordLogs.indexOf(existingEntry);
      wordLogs[index] = {date: logDate, words: words};
    } else {
      wordLogs.push({date: logDate, words: words});
    }
    return wordLogs;
  }

}

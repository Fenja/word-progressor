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

  logWords(id: string, project: Project, date: string, words: number) {
    console.log('log words', words);
    project.wordLogs = this.addWordsToLog(project.wordLogs, date, words);
    this.projectService.editProject(id, project);

    // do not log characters or pages to user stats
    if (project.countEntity === CountEntity.words) {
      console.log('log user words', date, words);
      let user = this.dataStorageService.user;
      user.wordLogs = this.addWordsToLog(user.wordLogs, date, words);
      this.dataStorageService.editUser(user.id!, user);
    }
  }

  public addWordsToLog(wordLogs: WordLog[] | undefined, date: string, words: number): WordLog[] {
    if (!wordLogs || wordLogs.length <= 0) wordLogs = [];
    let existingEntry = wordLogs.find(log => log.date === date);
    if (existingEntry) {
      words += existingEntry.words;
      const index = wordLogs.indexOf(existingEntry);
      wordLogs[index] = {date, words: words};
    } else {
      wordLogs.push({date, words: words});
      //wordLogs = this.sortWordLogs(wordLogs);
    }
    return wordLogs;
  }

  public sortWordLogs(wordLogs: WordLog[]) {
    let index = wordLogs.length -1;
    let tempLog = wordLogs[index];
    while (wordLogs[index-1].date < tempLog.date && index > 0) {
      wordLogs[index] = wordLogs[index-1];
      index -= 1;
      if (index === 0) wordLogs[0] = tempLog;
    }
    return wordLogs;
  }

  public deleteLog(id: string, project: Project, log: WordLog) {
    const index = project.wordLogs?.indexOf(log);
    delete project.wordLogs![index!];
    project.wordLogs = Utils.repairWordLogs(project.wordLogs!);
    this.projectService.editProject(project.id!, project);

    let user = this.dataStorageService.user;
    user.wordLogs = this.addWordsToLog(user.wordLogs, log.date, -log.words);
    user.wordLogs = Utils.repairWordLogs(user.wordLogs);
    this.dataStorageService.editUser(user.id!, user);
  }
}

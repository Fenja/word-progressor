import { Injectable } from '@angular/core';
import { CountEntity, Project } from "../project/project.model";
import { ProjectService } from "../project/project.service";
import { DataStorageService } from "./data-storage.service";

export interface WordLog {
  date: Date;
  words: number; // can be negative
}

@Injectable({
  providedIn: 'root'
})
export class LogWordsService {

  constructor(
    private projectService: ProjectService,
    private dataStorageService: DataStorageService,
  ) { }

  logWords(id: string, project: Project, wordLog: WordLog) {
    if (!project.wordLogs) project.wordLogs = [];
    project.wordLogs = this.addWordsToLog(project.wordLogs!, wordLog);
    this.projectService.editProject(id, project);

    // do not log characters or pages to user stats
    if (project.countEntity === CountEntity.words) {
      let user = this.dataStorageService.user;
      if (!user.wordLogs) user.wordLogs = [];
      user.wordLogs = this.addWordsToLog(user.wordLogs!, wordLog);
      this.dataStorageService.editUser(user.id!, user);
    }
  }

  getUserLogs() {
    return this.dataStorageService.user.wordLogs;
  }

  private addWordsToLog(wordLogs: WordLog[], wordLog: WordLog): WordLog[] {
    let logDate = new Date(wordLog.date).getTime();
    let existingLog = wordLogs.find(entry => new Date(entry.date).getTime() === logDate);
    if (!existingLog) {
      wordLogs.push(wordLog);
    } else {
      let newLog: WordLog = {words: existingLog.words + wordLog.words, date: existingLog.date};
      let index = wordLogs.findIndex(l => l === existingLog);
      wordLogs[index] = newLog;
    }
    return wordLogs;
  }
}

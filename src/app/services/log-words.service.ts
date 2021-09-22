import { Injectable } from '@angular/core';
import { Project } from "../project/project.model";
import { ProjectService } from "../project/project.service";
import { UserService } from "./user.service";

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
    private userService: UserService,
  ) { }

  logWords(id: string, project: Project, wordLog: WordLog) {
    if (!project.wordLogs) project.wordLogs = [];
    project.wordLogs = this.addWordsToLog(project.wordLogs!, wordLog);
    this.projectService.editProject(id, project);

    let userLog = this.userService.getUser().wordLogs;
    if (!userLog) userLog = [];
    userLog = this.addWordsToLog(userLog!, wordLog);
    this.userService.updateWordLog(userLog);
  }

  getUserLogs() {
    return this.userService.user.wordLogs;
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

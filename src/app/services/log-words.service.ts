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
    let projectLog = project.wordLogs;
    if (!projectLog || projectLog.length <= 0) {
      projectLog = [wordLog];
    } else {
      projectLog = this.addWordsToLog(projectLog!, wordLog);
    }
    project.wordLogs = projectLog;
    this.projectService.editProject(id, project);

    let userLog = this.userService.getUser().wordLogs;
    if (!userLog || userLog.length == 0) {
      userLog = [wordLog];
    } else {
      userLog = this.addWordsToLog(userLog!, wordLog);
    }
    this.userService.updateWordLog(userLog);
  }

  getUserLogs() {
    return this.userService.user.wordLogs;
  }

  private addWordsToLog(wordLogs: WordLog[], wordLog: WordLog): WordLog[] {
    console.log(wordLog.date.getTime());
    wordLogs.map(log => console.log(log.date.getTime()));
    wordLogs.map(log => console.log(log.date.getTime() + ' --- ' + (log.date.getTime() === wordLog.date.getTime()).toString()));
    let existingLog = wordLogs.find(entry => entry.date.getTime() === wordLog.date.getTime());
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

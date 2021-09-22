import { Injectable } from '@angular/core';
import {DataStorageService} from "./data-storage.service";
import {userData} from "../auth/user.model";
import {WordLog} from "./log-words.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: userData;

  constructor(
    private dataStorageService: DataStorageService,
  ) {
    this.fetchUser();
    this.user = dataStorageService.user;
  }

  getUser(): userData {
    this.fetchUser();
    return this.dataStorageService.user;
  }

  fetchUser() {
    this.dataStorageService.fetchUser();
  }

  updateWordLog(newWordLogs: WordLog[]) {
    this.user.wordLogs = newWordLogs;
    console.log('updateWordLog: ', JSON.stringify(this.user));
    this.dataStorageService.editUser(this.user.id!, this.user);
  }

}

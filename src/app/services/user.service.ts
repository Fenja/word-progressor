import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { DataStorageService } from "./data-storage.service";
import { Settings, userData } from "../auth/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  settings!: Settings;
  $filterChange = new Subject<void>();

  constructor(private dataStorageService: DataStorageService) {
    this.dataStorageService.fetchUser();
    this.settings = dataStorageService.user.settings!;
  }

  changedFilter(settings: Settings) {
    this.$filterChange.next();
    this.saveSettings(settings);
  }

  saveSettings(settings: Settings) {
    const user = this.dataStorageService.user;
    this.settings = settings;
    user.settings = settings;
    this.dataStorageService.editUser(user.id!, user);
  }

  getUser(): Subject<userData> {
    let userSubject = this.dataStorageService.user$;
    this.dataStorageService.fetchUser();
    return userSubject;
  }

  isNewUser() {
    // created today
    return true;
  }
}

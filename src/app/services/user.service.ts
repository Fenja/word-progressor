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
    this.dataStorageService.fetchSettings();
    this.settings = this.dataStorageService.settings;
  }

  changedFilter() {
    this.saveSettings();
    this.$filterChange.next();
  }

  saveSettings() {
    this.dataStorageService.saveSettings(this.settings);
  }

  getUser(): Subject<userData> {
    let userSubject = this.dataStorageService.user$;
    this.dataStorageService.fetchUser();
    this.dataStorageService.fetchSettings();
    return userSubject;
  }

  isNewUser() {
    // created today
    return true;
  }
}

import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { DataStorageService } from "./data-storage.service";
import { userData } from "../auth/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  settings!: {[key: string]: any};
  $filterChange = new Subject<void>();

  constructor(private dataStorageService: DataStorageService) {
    this.dataStorageService.fetchUser();
    this.settings = this.dataStorageService.getSettings();
    console.log('settings', JSON.stringify(this.settings));
  }

  toggleSetting(settingName: string) {
    this.settings[settingName] = !this.settings[settingName];
    this.dataStorageService.editSettings(this.settings);
    this.$filterChange.next();
  }

  getUser(): Subject<userData> {
    let userSubject = this.dataStorageService.user$;
    this.dataStorageService.fetchUser();
    return userSubject;
  }

  isNewUser() {
    // created today
    return true;//settings[''];
  }
}

import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { DataStorageService } from "./data-storage.service";

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

  getWordsToday(): number {
    const wordsToday =  this.dataStorageService.user.wordLogs?.find(wl => wl.date == new Date())?.words;
    return wordsToday ?? 0;
  }

  isNewUser() {
    // created today
    return true;//settings[''];
  }
}

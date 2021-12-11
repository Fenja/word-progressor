import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { DataStorageService } from "./data-storage.service";
import { Settings, userData } from "../auth/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  $filterChange = new Subject<void>();

  constructor(private dataStorageService: DataStorageService) {
    this.dataStorageService.fetchUser();
  }

  changedFilter(settings: Settings) {
    this.$filterChange.next();
    this.saveSettings(settings);
  }

  saveSettings(settings: Settings) {
    const user = this.dataStorageService.user;
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

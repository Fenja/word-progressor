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
  private user!: userData;

  constructor(private dataStorageService: DataStorageService) {
    this.dataStorageService.fetchUser();
    this.user = dataStorageService.user;
    this.settings = this.user.settings!;
  }

  changedFilter() {
    this.$filterChange.next();
    this.dataStorageService.editUser(this.user.id!, this.user);
  }

  saveSettings(settings: Settings) {
    this.settings = settings;
    this.user.settings = settings;
    this.dataStorageService.editUser(this.user.id!, this.user)
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

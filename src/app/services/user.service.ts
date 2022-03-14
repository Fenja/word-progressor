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
    this.saveSettings(settings);
    this.$filterChange.next();
  }

  getSettings() {
    return this.dataStorageService.user.settings;
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
    // TODO created today/this week
    return true;
  }

  toggleFavoriteSubmission(id: string, isFavorite: boolean) {
    const user = this.dataStorageService.user;
    var favorites = user.favorites;
    if (!favorites) favorites = [];
    if (isFavorite) {
      favorites!.push(id);
    } else {
      const index = favorites!.indexOf(id);
      delete favorites[index];
    }
    user.favorites = favorites;
    this.dataStorageService.editUser(user.id!, user);
  }
}

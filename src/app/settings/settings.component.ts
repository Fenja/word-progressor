import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { TranslationService } from "../translation/translation.service";
import { Router } from "@angular/router";
import { SnackbarService } from "../services/snackbar.service";
import { DataStorageService } from "../services/data-storage.service";
import { userData } from "../auth/user.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private translationService: TranslationService,
    private router: Router,
    private snackBarService: SnackbarService,
    private dataStorageService: DataStorageService,
  ) { }

  ngOnInit(): void {
  }

  createAccount() {
    this.router.navigate(['/auth'],{queryParams: { mode: 'createFromLocal'}});
  }

  deleteAccount() {
    if (confirm(this.translationService.translate('text_delete_account'))) {
      let userId = this.authService.userId;
      this.authService.deleteAccount();
      this.dataStorageService.deleteUser(userId);
      this.router.navigate(['/auth']).then(() => {
        this.snackBarService.showSnackBar(this.translationService.translate('msg_account_deleted'));
      });
    }
    // todo ask for password to confirm
  }

  saveUserSettings() {
    let userSettings: userData = {};
    // TODO get userData from form
    this.dataStorageService.saveUserSettings(userSettings);
  }
}

import { Component } from '@angular/core';
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
export class SettingsComponent {

  constructor(
    public authService: AuthService,
    private translationService: TranslationService,
    private router: Router,
    private snackBarService: SnackbarService,
    private dataStorageService: DataStorageService,
  ) { }

  createAccount() {
    this.router.navigate(['/auth'],{queryParams: { mode: 'createFromLocal'}}).then();
  }

  deleteAccount() {
    if (confirm(this.translationService.translate('text_delete_account'))) {
        this.authService.deleteAccount().then(() => {
            this.dataStorageService.deleteUser();
            this.router.navigate(['/auth']).then(() => {
              this.snackBarService.showSnackBar(this.translationService.translate('msg_account_deleted'));
            });
          }
        );
    }
    // todo ask for password to confirm
  }

}

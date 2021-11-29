import { Component } from '@angular/core';
import { Settings } from "../../auth/user.model";
import { UserService } from "../../services/user.service";
import { DataStorageService } from "../../services/data-storage.service";
import { SnackbarService } from "../../services/snackbar.service";
import { take } from "rxjs/operators";
import { TranslationService } from "../../translation/translation.service";

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html'
})
export class NotificationSettingsComponent {

  settings!: Settings;

  constructor(
    private userService: UserService,
    private dataStorageService: DataStorageService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
  ) {
    this.settings = this.userService.settings;
    this.userService.getUser()
      .pipe(
        take(1)
      )
      .subscribe(u => {
        if (u.settings) {
          this.settings = u.settings;
        }
      });
  }

  save() {
    this.userService.saveSettings(this.settings);
    this.snackBarService.showSnackBar(this.translationService.translate('msg_saved_settings'));
  }
}

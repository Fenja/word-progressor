import { Component } from '@angular/core';
import { SnackbarService } from "../../services/snackbar.service";
import { TranslationService } from "../../translation/translation.service";
import { UserService } from "../../services/user.service";
import { Settings } from "../../auth/user.model";
import { DataStorageService } from "../../services/data-storage.service";
import Utils from "../../helpers/utils";

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html'
})
export class DashboardSettingsComponent {

  settings: Settings = Utils.getDefaultSettings();

  constructor(
    private userService: UserService,
    private dataStorageService: DataStorageService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
  ) {
    this.userService.getUser()
      .subscribe(u => {
        if (u.settings) {
          this.settings = u.settings;
        }
      });
  }

  save() {
    console.log('dashboard-items save settings', this.settings);
    this.userService.saveSettings(this.settings);
    this.snackBarService.showSnackBar(this.translationService.translate('msg_saved_settings'));
  }
}

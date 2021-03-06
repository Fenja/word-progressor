import { Component } from '@angular/core';
import { SnackbarService } from "../../services/snackbar.service";
import { TranslationService } from "../../translation/translation.service";
import { UserService } from "../../services/user.service";
import { Settings } from "../../auth/user.model";
import { DataStorageService } from "../../services/data-storage.service";
import { MatTabChangeEvent } from "@angular/material/tabs";
import Utils from "../../helpers/utils";

@Component({
  selector: 'app-writing-goals',
  templateUrl: './writing-goals.component.html'
})
export class WritingGoalsComponent {

  settings: Settings = Utils.getDefaultSettings();
  isSelected: boolean[] = [false,false,false,false,false,false,false];

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
        if (!this.settings.selectedDays) this.settings.selectedDays = [];
        this.settings.selectedDays.forEach(d => this.isSelected[d] = true);
      }
    });
  }

  save() {
    console.log('writing-goals save settings', this.settings);
    this.userService.saveSettings(this.settings);
    this.snackBarService.showSnackBar(this.translationService.translate('msg_saved_settings'));
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.settings.isWeekDayGoal = tabChangeEvent.index === 0;
  }

  changeSelection(day: number) {
    this.isSelected[day] = !this.isSelected[day];
    if (this.isSelected[day]) {
      this.settings.selectedDays.push(day);
    } else {
      this.settings.selectedDays = this.settings.selectedDays.filter(d => d !== day);
    }
  }
}

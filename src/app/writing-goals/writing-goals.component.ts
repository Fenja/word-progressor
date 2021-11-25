import { Component, OnInit } from '@angular/core';
import { SnackbarService } from "../services/snackbar.service";
import { TranslationService } from "../translation/translation.service";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-writing-goals',
  templateUrl: './writing-goals.component.html'
})
export class WritingGoalsComponent implements OnInit {

  dailyWordGoal!: number;

  constructor(
    private userService: UserService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
  ) { }

  ngOnInit(): void {
    this.dailyWordGoal = this.userService.settings.dailyWordGoal;
  }

  save() {
    this.userService.settings.dailyWordGoal = this.dailyWordGoal;
    this.userService.saveSettings();
    this.snackBarService.showSnackBar(this.translationService.translate('msg_saved_settings'));
  }
}

import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Settings } from "../../auth/user.model";
import Utils from "../../helpers/utils";

@Component({
  selector: 'app-project-footer',
  templateUrl: './project-footer.component.html'
})
export class ProjectFooterComponent {

  showOnlyWip!: boolean;
  isSortByDeadline!: boolean;
  private settings: Settings = Utils.getDefaultSettings();

  constructor(
    public userService: UserService
  ) {
    this.userService.getUser().subscribe(u => {
      if (u && u.settings) {
        this.settings = u.settings;
        this.showOnlyWip = this.settings.showOnlyWip;
        this.isSortByDeadline = this.settings.isSortByDeadline;
      }
    })
  }

  toggleWip() {
    this.showOnlyWip = !this.showOnlyWip;
    this.settings.showOnlyWip = this.showOnlyWip;
    this.userService.changedFilter(this.settings);
    // maybe show snackbar?
  }

  toggleDeadline() {
    this.isSortByDeadline = !this.isSortByDeadline;
    this.settings.isSortByDeadline = this.isSortByDeadline;
    this.userService.changedFilter(this.settings);
  }
}

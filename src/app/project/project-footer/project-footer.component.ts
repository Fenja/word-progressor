import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Settings } from "../../auth/user.model";

@Component({
  selector: 'app-project-footer',
  templateUrl: './project-footer.component.html'
})
export class ProjectFooterComponent {

  showOnlyWip!: boolean;
  isSortByDeadline!: boolean;
  private settings: Settings | undefined;

  constructor(
    public userService: UserService
  ) {
    this.userService.getUser().subscribe(user => {
      this.settings = user.settings;
      if (this.settings) {
        this.showOnlyWip = this.settings.showOnlyWip;
        this.isSortByDeadline = this.settings.isSortByDeadline;
      }
    });
  }

  toggleWip() {
    if (!this.settings) return;
    this.showOnlyWip = !this.showOnlyWip;
    this.settings.showOnlyWip = this.showOnlyWip;
    this.userService.changedFilter(this.settings);
    // maybe show snackbar?
  }

  toggleDeadline() {
    if (!this.settings) return;
    this.isSortByDeadline = !this.isSortByDeadline;
    this.settings.isSortByDeadline = this.isSortByDeadline;
    this.userService.changedFilter(this.settings);
  }
}

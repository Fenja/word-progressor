import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-project-footer',
  templateUrl: './project-footer.component.html'
})
export class ProjectFooterComponent {

  showOnlyWip!: boolean;
  isSortByDeadline!: boolean;

  constructor(
    public userService: UserService
  ) {
    this.showOnlyWip = this.userService.settings.showOnlyWip;
    this.isSortByDeadline = this.userService.settings.isSortByDeadline;
  }

  toggleWip() {
    this.showOnlyWip = !this.showOnlyWip;
    this.userService.settings.showOnlyWip = this.showOnlyWip;
    this.userService.changedFilter();
    // maybe show snackbar?
  }

  toggleDeadline() {
    this.isSortByDeadline = !this.isSortByDeadline;
    this.userService.settings.isSortByDeadline = this.isSortByDeadline;
    this.userService.changedFilter();
  }
}

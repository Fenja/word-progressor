import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-project-footer',
  templateUrl: './project-footer.component.html'
})
export class ProjectFooterComponent {

  $updateProjects= new Subject<void>();

  constructor(
    public userService: UserService
  ) { }

  toggleWip() {
    this.userService.toggleShowOnlyWip();
    this.$updateProjects.next();
  }

  toggleSortByDeadline() {
    this.userService.toggleSortByDeadline();
    this.$updateProjects.next();
  }
}

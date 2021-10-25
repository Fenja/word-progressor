import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-project-footer',
  templateUrl: './project-footer.component.html'
})
export class ProjectFooterComponent {

  constructor(
    public userService: UserService
  ) { }


  getSetting(settingName: string): any {
    return this.userService.settings[settingName];
  }

  toggleSetting(settingName: string) {
    this.userService.toggleSetting(settingName);
  }
}

import { Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    public authService: AuthService
  ) {}

  onLogout() {
    this.authService.SignOut().then();
  }

}

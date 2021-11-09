import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    public authService: AuthService
  ) {}

  onLogout() {
    this.authService.SignOut();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}

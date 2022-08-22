import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output() public sidenavToggle = new EventEmitter();

  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Depending on the desired effect, you should probably only show the second header
    // if you've scrolled past the first header's height
    this.isScrolled = window.pageYOffset > 48;
  }

  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.SignOut();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}

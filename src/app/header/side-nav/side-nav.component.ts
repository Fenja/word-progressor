import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  @Output() sidenavClose = new EventEmitter();

  constructor(public authService: AuthService) { }

  onLogout() {
    this.authService.SignOut().then();
    this.onSidenavClose();
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }
}

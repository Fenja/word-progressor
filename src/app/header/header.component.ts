import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import {of, Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    public authService: AuthService
  ) {}

  onLogout() {
    this.authService.SignOut();
  }

}

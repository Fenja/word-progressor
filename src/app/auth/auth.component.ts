import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {AnonymousDialog} from "./anonymous-dialog/anonymous-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {

  isLoading = false;
  isLoginMode = true;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;

    let authObs: Observable<AuthResponseData> | undefined = undefined;

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);

    } else {
      const password2 = form.value.password_repeat;
      if (password != password2) {
        this.error = 'passwords_differ';
        this.isLoading = false;
      } else {
        authObs = this.authService.signup(email, password);
      }
    }

    if (authObs) {
      authObs.subscribe(response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/projects']); // TODO snackbar welcome penname
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });
    }

    form.reset();
  }

  onProceed() {
    this.dialog.open(AnonymousDialog);
  }
}

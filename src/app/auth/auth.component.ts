import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { AnonymousDialog } from "./anonymous-dialog/anonymous-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../project/project.model";
import { userData } from "./user.model";
import { DataStorageService } from "../services/data-storage.service";
import { filter } from "rxjs/operators";
import { ForgotPasswordDialog } from "./forgot-password/forgot-password.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoading = false;
  isLoginMode = true;
  isCreateFromLocalMode: boolean = false;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.isCreateFromLocalMode = params['mode'] === 'createFromLocal';
      if (this.isCreateFromLocalMode) this.isLoginMode = false;
    });

    if (!this.isCreateFromLocalMode && this.authService.isLoggedIn) {
      router.navigate(['/dashboard']).then();
    }
  }

  get error(): string | undefined {
    return this.authService.errorMsgKey;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authService.SignIn(email, password);
    } else {
      this.authService.SignUp(email, password).then(() => {
        if (this.isCreateFromLocalMode) {
          this._uploadLocalData();
        }
      });
    }

    form.reset();
  }

  onGoogleLogin() {
    this.isLoading = true;
    this.authService.GoogleAuth().then(() => {
      if (this.isCreateFromLocalMode) {
        this._uploadLocalData()
      }
    });
  }

  onProceed() {
    this.dialog.open(AnonymousDialog);
  }

  private _uploadLocalData() {
    this.authService.$userToken.pipe(
      filter(t => t?.length > 0),
    ).subscribe(_ => {

      // await login
      const projects: Project[] = JSON.parse(<string>localStorage.getItem('projects'));
      projects.forEach(project => this.dataStorageService.addProject(project));
      localStorage.removeItem('projects');

      const user: userData = JSON.parse(<string>localStorage.getItem('local_user'));
      // TODO wordlogs at api!!!
      localStorage.removeItem('local_user');

      console.log('uploaded user projects');
    })
  }

  forgotPassword() {
    this.dialog.open(ForgotPasswordDialog, {});
  }
}

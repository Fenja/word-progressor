import { Component, OnInit } from '@angular/core';
import { NgForm} from "@angular/forms";
import { AuthService } from "./auth.service";
import { AnonymousDialog } from "./anonymous-dialog/anonymous-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../project/project.model";
import { userData } from "./user.model";
import { DataStorageService } from "../services/data-storage.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {

  isLoading = false;
  isLoginMode = true;
  error: string | null = null;
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
      router.navigate(['dashboard']);
    }
  }

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

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authService.SignIn(email, password).then(() => {
        this.authService.isAnonymous = false;
        this.isLoading = false;
        this.router.navigate(['dashboard']);
      });
    } else {
      this.authService.SignUp(email, password).then(() => {
        this.authService.isAnonymous = false;
        if (this.isCreateFromLocalMode) {
          this._uploadLocalData();
        }
        this.isLoading = false;
        this.router.navigate(['dashboard']);
      });
    }

    form.reset();
  }

  onGoogleLogin() {
    this.isLoading = true;
    this.authService.GoogleAuth().then(() => {
      console.log('google auth');
      this.isLoading = false;
      this.authService.isAnonymous = false;
      if (this.isCreateFromLocalMode) {
        this._uploadLocalData();
      }
      this.router.navigate(['dashboard']).then();
    });
  }

  onProceed() {
    this.dialog.open(AnonymousDialog);
  }

  private _uploadLocalData() {
    this.authService.isAnonymous = false;
    const projects: Project[] = JSON.parse(<string>localStorage.getItem('projects'));
    projects.forEach(project => this.dataStorageService.addProject(project));
    localStorage.removeItem('projects');

    const user: userData = JSON.parse(<string>localStorage.getItem('local_user'));
    // TODO wordlogs at api!!!
    localStorage.removeItem('local_user');

    console.log('uploaded user projects');
  }
}

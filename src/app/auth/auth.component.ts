import { Component, OnInit } from '@angular/core';
import { NgForm} from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { AnonymousDialog } from "./anonymous-dialog/anonymous-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Project } from "../project/project.model";
import { userData } from "./user.model";

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
    private http: HttpClient,
  ) {
    this.route.queryParams.subscribe(params => {
      this.isCreateFromLocalMode = params['mode'] === 'createFromLocal';
      if (this.isCreateFromLocalMode) this.isLoginMode = false;
    });
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
        if (this.isCreateFromLocalMode) {
          this.authService.setAnonymous(false);
          this._uploadLocalData();
        }
        this.router.navigate(['/projects']);
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

  // move to seperate Service?
  private _uploadLocalData() {
    const id = this.authService.userId;
    let projects: Project[] = JSON.parse(<string>localStorage.getItem('projects'));
    projects.map(project => {
      this.http.post<any>(
        environment.FIREBASE_DB_URL + id + '/projects.json',
        project
      ).subscribe(() => {
          localStorage.removeItem('projects');
        },
        error => {
          console.log(error)
        }
      )
    });

    const user: userData = JSON.parse(<string>localStorage.getItem('user'));
    this.http.post<any>(
      environment.FIREBASE_DB_URL+id+'.json',
      user
    ).subscribe(() => {
      // TODO wordlogs at api!!!
      localStorage.removeItem('user');
      },
      error => {
        console.log(error)
      }
    )
  }
}

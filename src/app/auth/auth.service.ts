import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { User} from "./user.model";
import { environment } from "../../environments/environment";

const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const SIGNIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

const API_KEY = environment.FIREBASE_API_KEY;

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new BehaviorSubject<User | null>(null);
  userId = '';
  private tokenExpirationTimer: any;
  isAnonymous: boolean | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      SIGNUP_URL + API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(AuthService.handleError), tap(response => {
      this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      SIGNIN_URL + API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(AuthService.handleError), tap(response => {
      this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
    }));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(<string>localStorage.getItem('userData'));
    if (!userData) {
      this.checkAnonymous();
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    this.userId = loadedUser.id;

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
      this.setAnonymous(false);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user.next(null);
    this.userId = '';
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.userId = userId;
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    this.setAnonymous(false);
  }

  private static handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'error_unknown';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorResponse.error.error.message);
  }

  checkAnonymous() {
    if (!!localStorage.getItem('isAnonymous') && localStorage.getItem('isAnonymous') === 'true') {
      this.isAnonymous = true;
    }
  }

  setAnonymous(isAnonymous: boolean) {
    this.isAnonymous = isAnonymous;
    localStorage.setItem('isAnonymous', isAnonymous.toString());
  }
}

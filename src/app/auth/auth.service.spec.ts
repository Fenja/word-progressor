import { AuthService } from "./auth.service";
import { fakeAsync, flushMicrotasks, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { RouterTestingModule } from "@angular/router/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { environment } from "../../environments/environment";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { of, throwError } from "rxjs";

describe('AuthService', () => {
  let service: AuthService;
  let afAuth: any = {
    authState: {},
    setPersistence: () => Promise.resolve(),
    signInWithEmailAndPassword: () => {},
    createUserWithEmailAndPassword: () => {},
    currentUser: () => {},
    sendPasswordResetEmail: () => {},
    signInWithPopup: () => {},
    signOut: () => {},
    error: () => {}
  };
  let controller: HttpTestingController;
  const email = 'test@test.com';
  const password = 'P4ssword!';
  const userCredential: UserCredential = {credential: null, user: null}

  beforeEach(() => {
    let store: {[key: string]: string} = {};

    spyOn(localStorage, 'getItem').and.callFake(function (key: string) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key: string, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'removeItem').and.callFake(function (key: string) {
      return store[key] = '';
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
      store = {};
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
        AngularFireDatabaseModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: afAuth,
        }
      ]
    });
    afAuth.authState = of(null);
    service = TestBed.inject(AuthService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should create', function () {
    expect(service).toBeTruthy();
  });

  it('signs in', () => {
    let signInSpy = spyOn(afAuth, 'signInWithEmailAndPassword').and.returnValue(Promise.resolve(userCredential));
    service.SignIn(email, password)
      .then( c => {
        expect(c).toEqual(userCredential);
      });
    expect(signInSpy).toHaveBeenCalled();
  });

  it('returns error when sign in failed', fakeAsync(() => {
    let signInSpy = spyOn(afAuth, 'signInWithEmailAndPassword').and.returnValue(throwError('error happened')).and.callThrough();
    flushMicrotasks();
    service.SignIn(email, password);
    expect(service.errorMsgKey).toEqual('error_sign_in_failed');
    expect(signInSpy).toHaveBeenCalled();
  }));

  it('signs up', () => {
    let signUpSpy = spyOn(afAuth, 'createUserWithEmailAndPassword').and.returnValue(Promise.resolve(userCredential));
    service.SignUp(email, password);
    expect(signUpSpy).toHaveBeenCalled();
  });

  it('returns error when sign up failed', () => {
    let signUpSpy = spyOn(afAuth, 'createUserWithEmailAndPassword').and.returnValue(throwError('error happened'));
    service.SignUp(email, password);
    expect(service.errorMsgKey).toEqual('error_sign_up_failed');
    expect(signUpSpy).toHaveBeenCalled();
  });


  it('calls verification send via mail method', () => {
    spyOn(afAuth, 'createUserWithEmailAndPassword').and.returnValue(Promise.resolve(userCredential));
    let mailSpy = spyOn(service, 'SendVerificationMail');
    expect(mailSpy).toHaveBeenCalled();
  });

  it('is logged in when user item is in local storage', () => {
    localStorage.setItem('user', JSON.stringify({}));
    expect(service.isLoggedIn).toBeTruthy();
  });

  it('is not logged in when local storage is empty', () => {
    expect(service.isLoggedIn).toBeFalsy();
  });

  it('logs in with google', () => {
    let authSpy = spyOn(service, 'AuthLogin');
    service.GoogleAuth();
    expect(authSpy).toHaveBeenCalled();
    expect(localStorage.getItem('user')).toBeDefined();
    expect(service.isLoggedIn).toBeTruthy();
  });

  it('returns error when google sign in failed', () => {
    let googleSpy = spyOn(service, 'AuthLogin').and.throwError('error happened');
    service.GoogleAuth();
    expect(service.errorMsgKey).toEqual('error_google_auth_failed');
    expect(googleSpy).toHaveBeenCalled();
  });

  it('signs out', () => {
    localStorage.setItem('user', JSON.stringify('userData'));
    localStorage.setItem('user_token', JSON.stringify('secret token'));
    let signOutSpy = spyOn(afAuth, 'signOut').and.returnValue(Promise.resolve());
    service.SignOut();
    expect(signOutSpy).toHaveBeenCalled();
    expect(localStorage.getItem('user')).toEqual('');
    expect(localStorage.getItem('user_token')).toEqual('');
    expect(service.isLoggedIn).toBeFalsy();
  });

})

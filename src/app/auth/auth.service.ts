import {Injectable, NgZone, OnDestroy} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import auth = firebase.auth;
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { BehaviorSubject, Subscription } from "rxjs";
import { SnackbarService } from "../services/snackbar.service";
import { TranslationService } from "../translation/translation.service";

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
export class AuthService implements OnDestroy {

  userData: any;
  isAnonymous: boolean | null = null;
  private subscription: Subscription;
  $userToken = new BehaviorSubject<string>('');
  private checkForVerifiedInterval = 1000;
  public errorMsgKey: string | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone,
    private snackbarService: SnackbarService,
    private translationService: TranslationService,
  ) {
    this.subscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        user.getIdTokenResult(true).then(t => {
            this.isAnonymous = false;
            this.$userToken.next(t.token);
            this.SetUserData(user);
            localStorage.setItem('user', JSON.stringify(this.userData));
            this.ngZone.run(() => {
              this.router.navigate(['/dashboard']).then();
            })
          }
        );

      } else {
        this.$userToken.next('');
        localStorage.setItem('user', '');
      }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

// Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(() => {
        this.errorMsgKey = 'error_sign_in_failed';
      })
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail().then();
      }).catch(() => {
        this.errorMsgKey = 'error_sign_up_failed';
      })
  }

  // Send email verification when new user signs up
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u?.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']).then( () =>
          this.checkForVerifiedInterval = setInterval(() => {
            this.afAuth
              .currentUser.then(u => {
              u?.reload()
                .then(() => {
                  if (u?.emailVerified) {
                    this.SignOut().then();
                    // TODO auto login
                    this.snackbarService.showSnackBar(this.translationService.translate('msg_email_verified'))
                    clearInterval(this.checkForVerifiedInterval)
                  }
                })
            })
          }, 1000)
        );
      })
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.snackbarService.showSnackBar('msg_pw_reset_mail_sent');
      }).catch((error) => {
        this.errorMsgKey = 'error_forgot_pw_failed';
      })
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const userItem = localStorage.getItem('user');
    if (userItem === undefined) return false;
    if (typeof userItem === "string" && userItem.length > 0) {
      const user = JSON.parse(userItem);
      return (user !== null && user.emailVerified !== false);
    }
    return false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: auth.GoogleAuthProvider) {
    return this.afAuth.signInWithPopup(provider)
      .catch(() => {
        this.errorMsgKey = 'error_google_auth_failed';
      })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(this.userData, {
      merge: true
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = undefined;
      this.router.navigate(['auth']).then();
    })
  }

  deleteAccount() {
    return this.afAuth.currentUser.then(u => {
      u?.delete();
      this.router.navigate(['auth']).then();
    });
    // TODO delete projects
  }

  getUserToken(): Promise<string | undefined> {
    return this.afAuth.currentUser
      .then((u: firebase.User | null) => u?.getIdToken(true)
        .then(t => t)
      );
  }
}

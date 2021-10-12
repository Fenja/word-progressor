import {Injectable, NgZone, OnDestroy} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import UserCredential = firebase.auth.UserCredential;
import auth = firebase.auth;
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { BehaviorSubject, Subscription } from "rxjs";
import {SnackbarService} from "../services/snackbar.service";
import {TranslationService} from "../translation/translation.service";

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
  subscription: Subscription;
  $userToken = new BehaviorSubject<string>('');
  private checkForVerifiedInterval = 1000;

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
        user.getIdTokenResult(true).then(t =>
          this.$userToken.next(t.token)
        );
        this.SetUserData(user);
        localStorage.setItem('user', JSON.stringify(this.userData));
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
      .then((result: UserCredential) => {
        if (result.user) this.SetUserData(result.user);
      }).catch((error: { message: any; }) => {
        window.alert(error.message)
        // TODO display error
      })
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result: UserCredential) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        if (result.user) this.SetUserData(result.user);
      }).catch((error: { message: any; }) => {
        window.alert(error.message);
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u?.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
        this.checkForVerifiedInterval = setInterval(() => {
          this.afAuth
            .currentUser.then(u => {
            u?.reload()
              .then(ok => {
                if (u?.emailVerified) {
                  this.SignOut();
                  // TODO auto login
                  this.snackbarService.showSnackBar(this.translationService.translate('msg_email_verified'))
                  clearInterval(this.checkForVerifiedInterval)
                }
              })
          })
        }, 1000)
      })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error: any) => {
        window.alert(error)
      })
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const userItem = localStorage.getItem('user');
    if (userItem === undefined) return false;
    if (typeof userItem === "string" && userItem.length > 0) {
      const user = JSON.parse(userItem);
      return (user !== null && user.emailVerified !== false) ? true : false;
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
      .then((result: UserCredential) => {
        if (result.user) this.SetUserData(result.user);
      }).catch((error: any) => {
        window.alert(error)
        // TODO display error
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
      this.router.navigate(['auth']);
    })
  }

  deleteAccount() {
    return this.afAuth.currentUser.then(u => {
      u?.delete();
      this.router.navigate(['auth']);
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

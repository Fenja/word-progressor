import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { catchError, switchMap, tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  // https://stackoverflow.com/questions/45202208/angular-4-interceptor-retry-requests-after-token-refresh

  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addAuthHeader(req);

    // @ts-ignore
    return next.handle(req).pipe(
      catchError(error => {
        return this.handleResponseError(error, req, next);
      })
    );
  }

  addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAuthToken();
    return request.clone({
      params: new HttpParams().set('auth', token)
    });
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      return this.authService.refreshToken().pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
          //this.tokenRefreshedSource.next();
        }));
        /*catchError(e => {
          this.refreshTokenInProgress = false;
          this.logout();
        }));*/
    }
  }

  logout() {
    this.authService.SignOut();
  }

  handleResponseError(error: HttpErrorResponse, request?: HttpRequest<any>, next?: HttpHandler): any {
    if (error.status === 400) {
      // Show message
    } else if (error.status === 401) {
      return this.refreshToken().pipe(
        switchMap(() => {
          // @ts-ignore
          request = this.addAuthHeader(request);
          // @ts-ignore
          return next.handle(request);
        }),
        catchError(e => {
          if (e.status !== 401) {
            return this.handleResponseError(e);
          } else {
            this.logout();
          }
        })
      );
    } else if (error.status === 403) {
      // show message
      this.logout();
    } else if (error.status === 404) {
      // redirect to 404 page
    } else if (error.status === 500) {
      // show message
    } else if (error.status === 503) {
      // show message
      // redirect to maintenance page
    }

    return throwError(error);
  }
}

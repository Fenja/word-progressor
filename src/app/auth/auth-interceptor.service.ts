import {Injectable, OnDestroy} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor, OnDestroy {

  private _userToken: string = '';
  subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.$userToken.subscribe( t => this._userToken = t);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this._userToken || this._userToken.length <= 0) {
      return next.handle(req);
    }

    const modifiedRequest = req.clone({
      params: new HttpParams().set('auth', this._userToken)
    })
    return next.handle(modifiedRequest);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

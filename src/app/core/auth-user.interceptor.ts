import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { IUser } from './interfaces';

@Injectable()
export class AuthUserInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.url?.endsWith('login') || event.url?.endsWith('register')) {
            let newlyLoggedUser: unknown;
            newlyLoggedUser = event.body as IUser
            this.authService.handleLogin(newlyLoggedUser as IUser)
          }
        }
      })
    );
  }
}

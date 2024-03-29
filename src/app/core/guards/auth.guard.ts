import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn$.pipe(take(1), map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }

      return this.router.createUrlTree(['/user/login'], {
        queryParams: {
          'redirect-to': '/' + route.url.map(f => f.path).join('/')
        }
      });
    }))
  }

}

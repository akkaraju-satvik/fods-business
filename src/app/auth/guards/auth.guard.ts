import { Injectable } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(route.data['path'] === 'login') {
      if(this.authService.authData.isLoggedIn) {
        this.router.navigate(['/home']);
        return false;
      }
      authState(this.authService.auth).subscribe({
        next: (user) => {
          user?.getIdToken().then((token) => {
            if (user && token) {
              this.authService.checkBusiness(token).subscribe({
                next: (res) => {
                  console.log(res);
                  this.authService.authData.isLoggedIn = true;
                  this.authService.errorCode = null;
                  localStorage.setItem('user', JSON.stringify(user));
                  localStorage.setItem('token', token);
                  this.authService.checkLoginStatus();
                },
                error: (err) => {
                  this.authService.logout();
                }
              })
            }
          });
        },
        error: (error) => {

        },
      });
    } else {
      if(!this.authService.authData.isLoggedIn) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    return true;
  }
  
}

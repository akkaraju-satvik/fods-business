import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData: { isLoggedIn: boolean, user: any; } = {
    isLoggedIn: false,
    user: null,
  };

  errorCode!: string | null;

  authStateSubscription!: Subscription;


  constructor(public auth: Auth, public router: Router, private http: HttpClient) { }

  checkLoginStatus() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      this.authData.isLoggedIn = true;
      this.authData.user = JSON.parse(user);
      this.router.navigate(['/home']);
    } else {
      this.authData.isLoggedIn = false;
      this.authData.user = null;
      this.router.navigate(['/login']);
      this.logout();
    }
  }

  loginWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then((result) => {
      console.log('loginWithGoogle() result:', result);
    }).catch((error) => {
      console.log('loginWithGoogle() error', error);
    });
  }

  checkBusiness(token: string) {
    return this.http.post(environment.auth_endpoint + '/login', { token }, {
      headers: {
        'module': 'business'
      }
    })
  }

  logout() {
    this.authData.isLoggedIn = false;
    localStorage.clear();
    this.auth.signOut().then((res) => {
      console.log(res);
      this.router.navigate(['/login']);
    });
  }
}

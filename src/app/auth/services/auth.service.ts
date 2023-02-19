import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

type LoginResponse = {
  code: string,
  data: {
    token: string,
    user: {
      business: {
        address: {
          latitude: number,
          longitude: number,
        },
        business_id: string,
        business_name: string,
        rating: number | null,
      },
      global_user_id: string,
      email: string | null,
      phone: string | null,
      profile_picture_url: string | null,
    }
  }
}

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
      this.checkAuthorization(this.authData.user).subscribe({
        next: (res) => {
          console.log('checkAuthorization() res:', res);
        },
        error: (err) => {
          console.log('checkAuthorization() err:', err);
          this.logout();
        }
      })
    } else {
      this.authData.isLoggedIn = false;
      this.authData.user = null;
      this.router.navigate(['/login']);
      this.logout('google-only');
    }
  }

  checkAuthorization(user: any) {
    return this.http.get(`${environment.auth_endpoint}/check/${user.business_id}`, {
      headers: {
        'module': 'business',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  loginWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then((result) => {
      console.log('loginWithGoogle() result:', result);
    }).catch((error) => {
      console.log('loginWithGoogle() error', error);
    });
  }

  checkBusiness(token: string) {
    return this.http.post<LoginResponse>(environment.auth_endpoint + '/login', { token }, {
      headers: {
        'module': 'business'
      }
    })
  }

  removeToken() {
    return this.http.delete(`${environment.auth_endpoint}/logout`, {
      headers: {
        'module': 'business',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  logout(type: string = 'all') {
    this.auth.signOut().then((res) => {
      console.log(res);
      if(type === 'google-only') return;
      this.removeToken().subscribe((res) => {
        localStorage.clear();
        this.authData.user = null;
        this.authData.isLoggedIn = false;
        this.router.navigate(['/login']);
      })
    });
  }
}

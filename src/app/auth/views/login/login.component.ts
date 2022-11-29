import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  ngOnDestroy(): void {
    this.authService.authStateSubscription.unsubscribe();
  }

}

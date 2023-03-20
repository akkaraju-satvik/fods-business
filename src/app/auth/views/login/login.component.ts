import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general/services/general.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'business-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  phoneLogin!: boolean;

  hamburgerMenuItems = [];

  constructor(public authService: AuthService, public generalService: GeneralService) { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  closeModal(modal: string) {
    this.authService.errorModal = false;
  }

  ngOnDestroy(): void {
    this.authService.authStateSubscription.unsubscribe();
  }

}

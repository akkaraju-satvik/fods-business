import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'business';

  constructor(private authService: AuthService) {  }

  ngOnInit() {
    this.authService.checkLoginStatus();
  }
}

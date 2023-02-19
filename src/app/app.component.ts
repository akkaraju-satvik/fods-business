import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { GeneralService } from './general/services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private authService: AuthService, private generalService: GeneralService) {  }

  ngOnInit() {
    this.authService.checkLoginStatus();
    if(window.innerWidth < 768) {
      this.generalService.mobileView = true;
    }
  }

}

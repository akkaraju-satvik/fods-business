import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GeneralService } from 'src/app/general/services/general.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'business-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hamburgerMenuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/']
    },
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      routerLink: ['/business/profile']
    },
    {
      label: 'Orders',
      icon: 'pi pi-fw pi-list',
      routerLink: ['/business/orders']
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        this.authService.logout();
      }
    }
  ];

  getDashboardLoad: boolean = false;
  dashboardData: any;

  constructor(public authService: AuthService, public generalService: GeneralService, public dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboard(this.authService.authData?.user?.business_id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.dashboardData = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}

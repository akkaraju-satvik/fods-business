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
  
  orderStatusMap: any = {
    order_placed: 'Order Placed',
    order_received: 'Order Received',
    order_preparing: 'Order Preparing',
    order_ready: 'Order Ready',
    picked_up: 'Picked Up',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  };

  getDashboardLoad: boolean = false;
  dashboardData: any;
  aggregateData: any;

  constructor(public authService: AuthService, public generalService: GeneralService, public dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getDashboardLoad = true;
    this.dashboardService.getDashboard(this.authService.authData?.user?.business_id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.dashboardData = response.data;
        this.aggregateData = [
          {
            title: 'Total Orders',
            value: this.dashboardData.total_orders
          },
          {
            title: 'Total Revenue',
            value: `₹${this.dashboardData.total_revenue.toFixed(2)}`
          },
          {
            title: 'Active Orders',
            value: this.dashboardData.active_orders
          },
          {
            title: 'Menu Items',
            value: this.dashboardData.menu_items
          },
          {
            title: 'Avg Rating',
            value: this.dashboardData.rating
          }
        ];
        console.log(this.aggregateData);
        this.getDashboardLoad = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GeneralService } from 'src/app/general/services/general.service';
import { DashboardService } from '../../services/dashboard.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'business-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

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

  getOrdersLoad: boolean = false;
  ordersData: any;

  constructor(public authService: AuthService, public generalService: GeneralService, public ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getOrders(this.authService.authData?.user?.business_id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.ordersData = response.data;
        this.getOrdersLoad = false;
      },
      error: (error: any) => {
        console.log(error);
        this.getOrdersLoad = false;
      }
    });
  }

}

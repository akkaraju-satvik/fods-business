import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GeneralService } from 'src/app/general/services/general.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'business-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent {
  
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

  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GeneralService } from 'src/app/general/services/general.service';
import { MenuItemsService } from '../../services/menu-items.service';
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

  availablilityDropdown = [
    { label: 'Available', value: true },
    { label: 'Unavailable', value: false }
  ];

  menuItemsLoad: boolean = false;
  menuItemsData: any;
  updatePopupVisible!: boolean;
  deletePopupVisible!: boolean;
  currentMenuItem: any;
  addPopupVisible!: boolean;

  menuItemForm: FormGroup = new FormGroup({
    menu_item_name: new FormControl('', [Validators.required]),
    available: new FormControl(true, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  constructor(public authService: AuthService, public generalService: GeneralService, public menuItemsService: MenuItemsService) { }

  ngOnInit(): void {
    this.menuItemsLoad = true;
    this.menuItemsService.getMenuItems(this.authService.authData?.user?.business_id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.menuItemsData = response.data;
        this.menuItemsLoad = false;
      },
      error: (error: any) => {
        console.log(error);
        this.menuItemsLoad = false;
      }
    });
  }

  openPopup(event: any) {
    console.log(event);
    if (event.type === 'update') {
      this.updatePopupVisible = true;
      this.menuItemForm.patchValue({
        menu_item_name: event.menuItem.menu_item_name,
        available: event.menuItem.availability,
        description: event.menuItem.description,
        price: event.menuItem.price,
      });
      this.currentMenuItem = event?.menuItem?.menu_item_id;
    } else if (event.type === 'delete') {
      this.deletePopupVisible = true;
      this.currentMenuItem = event?.menuItem?.menu_item_id;
    } else if (event.type === 'add') {
      this.menuItemForm.reset();
      this.addPopupVisible = true;
    }
  }

  menuItemOperation(operation: string) {
    if (operation === 'update') {
      console.log(this.menuItemForm.value);
      const requestBody = {
        menu_item_name: this.menuItemForm.value.menu_item_name,
        availability: this.menuItemForm.value.available,
        description: this.menuItemForm.value.description,
        price: this.menuItemForm.value.price,
      };
      this.menuItemsService.updateMenuItem(this.currentMenuItem, requestBody).subscribe({
        next: (response: any) => {
          console.log(response);
          this.updatePopupVisible = false;
          this.addPopupVisible = false;
          this.ngOnInit();
        },
        error: (error: any) => {
          console.log(error);
          this.updatePopupVisible = false;
        }
      });
    } else if (operation === 'delete') {
      this.menuItemsService.deleteMenuItem(this.currentMenuItem).subscribe({
        next: (response: any) => {
          console.log(response);
          this.deletePopupVisible = false;
          this.ngOnInit();
        },
        error: (error: any) => {
          console.log(error);
          this.deletePopupVisible = false;
        }
      });
    } else if (operation === 'add') {
      const requestBody = {
        menu_item_name: this.menuItemForm.value.menu_item_name,
        availability: this.menuItemForm.value.available,
        description: this.menuItemForm.value.description,
        price: this.menuItemForm.value.price,
      };
      this.menuItemsService.addMenuItem(requestBody).subscribe({
        next: (response: any) => {
          console.log(response)
          this.updatePopupVisible = false;
          this.addPopupVisible = false;
          this.ngOnInit()
        },
        error: (error: any) => {
          console.log(error);
          this.addPopupVisible = false;
          this.updatePopupVisible = false;
          this.ngOnInit()
        }
      });
    }
  }
}

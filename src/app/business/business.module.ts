import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { HomeComponent } from './views/home/home.component';
import { GeneralModule } from '../general/general.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { OrdersComponent } from './views/orders/orders.component';
import { MenuItemsComponent } from './views/menu-items/menu-items.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    OrdersComponent,
    MenuItemsComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    GeneralModule
  ]
})
export class BusinessModule { }

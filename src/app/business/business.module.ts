import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { HomeComponent } from './views/home/home.component';
import { GeneralModule } from '../general/general.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { OrdersComponent } from './views/orders/orders.component';
import { MenuItemsComponent } from './views/menu-items/menu-items.component';
import { PrimengModule } from '../primeng/primeng.module';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { OrderDetailsComponent } from './views/order-details/order-details.component';
import { MenuItemCardComponent } from './components/menu-item-card/menu-item-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    OrdersComponent,
    MenuItemsComponent,
    OrderCardComponent,
    StatCardComponent,
    OrderDetailsComponent,
    MenuItemCardComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    GeneralModule,
    PrimengModule
  ]
})
export class BusinessModule { }
